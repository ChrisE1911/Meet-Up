import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from '../../store/event';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventsComponentCard from '../EventsComponentCard';
import { getGroups } from '../../store/group';

function EventsComponent() {
    const dispatch = useDispatch();
    const allEvents = useSelector(state => state.events.allEvents)

    const allGroups = useSelector(state => state.groups.allGroups)

    const sessionUser = useSelector(state => state.session.user)

    const allEventsArr = Object.values(allEvents)

    const allGroupsArr = Object.values(allGroups)

    console.log(allGroupsArr)

    const groupId = allGroupsArr.find((group) => group.organizerId === sessionUser.id)

    console.log(groupId)

    let groupIdObj = Object.assign({}, groupId)





    useEffect(() => {
        dispatch(getEvents(allEvents))
    }, [dispatch])

    useEffect(() => {
        dispatch(getGroups(allGroups))
    }, [dispatch])

    return (
        <>
                <div id='toggle-buttons'>
                    <Link to={'/events'}>Events</Link>
                    <Link to={'/groups'}>Groups</Link>
                </div>
            <div id='card-container'>
                {!allEventsArr && <span>No Events available right now</span>}
                <ul>
                    {allEventsArr.map((event) => {
                        return <EventsComponentCard key={event.id} event={event} />
                    })}
                </ul>
                { sessionUser && <Link to={`/events/${groupIdObj.id}/new`}>Create Event</Link>}
            </div>
        </>
    )
}

export default EventsComponent
