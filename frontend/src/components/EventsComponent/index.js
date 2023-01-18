import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from '../../store/event';
import { useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import EventsComponentCard from '../EventsComponentCard';
import { getGroups } from '../../store/group';

function EventsComponent() {
    const dispatch = useDispatch();

    const history = useHistory();

    const allEvents = useSelector(state => state.events.allEvents)

    const allGroups = useSelector(state => state.groups.allGroups)

    const sessionUser = useSelector(state => state.session.user)

    const allEventsArr = Object.values(allEvents)

    const allGroupsArr = Object.values(allGroups)

    const groupId = allGroupsArr.find((group) => group.organizerId === sessionUser?.id)


    useEffect(() => {
        dispatch(getEvents(allEvents))
    }, [dispatch])

    useEffect(() => {
        dispatch(getGroups(allGroups))
    }, [dispatch])


    if (allEventsArr.length === 0) return null;
    else {
        return (
            <>
                <div className='toggle-buttons-container'>
                    <div className='toggle-buttons'>
                        <NavLink to={'/events'} activeStyle={{ color: 'teal', fontSize: '25px'}}>
                            {/* <button className='events-button'> */}
                                Events
                            {/* </button> */}
                        </NavLink>
                        <Link to={'/groups'}>
                            <button className='groups-button'>
                                Groups
                            </button>
                        </Link>
                    </div>
                </div>
                <div id='card-container'>
                    <h2>Explore our upcoming events. Click on an event below to view details and more! </h2>
                    {groupId && groupId !== undefined ? <h3>If you're ready to create an event, click here <button className='button-design' onClick={() => history.push(`events/${groupId.id}/new`)}>Create New Event</button></h3>: <h3>Please create a group before you create an event.</h3>}
                    {!allEventsArr && <span>No Events available right now</span>}
                    <ul>
                        {allEventsArr.map((event) => {
                            return <EventsComponentCard key={event.id} event={event} />
                        })}
                    </ul>
                </div>
            </>
        )
    }
}

export default EventsComponent
