import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOneEvent } from '../../store/event';
import { getOneGroup } from '../../store/group';
import { getGroups } from '../../store/group';
import { useHistory } from 'react-router-dom';
import { deleteEvent } from '../../store/event';
import './EventDetailsComponent.css';


function EventDetailsComponent() {
    const dispatch = useDispatch()
    const history = useHistory();

    const { eventId } = useParams();
    const currentGroup = useSelector(state => state.groups.singleGroup)
    const currentEvent = useSelector(state => state.events.singleEvent)
    const sessionUser = useSelector(state => state.session.user)
    const allGroups = useSelector(state => state.groups.allGroups)
    const allGroupsArr = Object.values(allGroups)
    const groupId = allGroupsArr.find((group) => group?.organizerId === sessionUser?.id)
    let groupIdObj = Object.assign({}, groupId)
    const newStartDate = new Date(currentEvent.startDate).toDateString().split(' ').slice(0, 3)
    const newStartDateTime = new Date(currentEvent.startDate).toLocaleString().split(',')[1]
    const newEndDate = new Date(currentEvent.endDate).toDateString().split(' ').slice(0, 3)
    const newEndDateTime = new Date(currentEvent.endDate).toLocaleString().split(',')[1]

    console.log('HEYYYYY', currentGroup)

    useEffect(() => {
        console.log('LOOK HERE', currentGroup)
        dispatch(getOneGroup(currentEvent.groupId))
    }, [dispatch, currentEvent.groupId])

    useEffect(() => {
        dispatch(getOneEvent(+eventId))
    }, [dispatch, eventId])

    useEffect(() => {
        dispatch(getGroups(allGroups))
    }, [dispatch])


    const deleteEventhandler = async (eventId) => {

        await dispatch(deleteEvent(+eventId))

        history.push('/events');
    }
    
        return (
            <>
                <div className='event-container'>
                    <div id='event-container-title'>
                        {currentEvent.name && <h1>{currentEvent.name}</h1>}
                        <div>Hosted By</div>
                        {currentEvent.Group && <h4>{`${currentEvent.Group.name}`}</h4>}
                    </div>
                    <br />
                    <br />
                    <br />
                    <div id='event-container-information'>
                        <div id='event-details'>
                            {currentEvent.EventImages && <img src={currentEvent.EventImages[0].url} alt='Event'></img>}
                            <h3>Details</h3>
                            <p>{currentEvent.description}</p>
                            <p>
                                {currentEvent.numAttending === 0 ? <h3>No one is attending this event yet</h3> : <h3>{`Attendees: ${currentEvent.numAttending}`}</h3>}
                            </p>
                        </div>
                        <div id='event-information'>
                            <div id='icon-container'>
                                <i class="fa-solid fa-location-pin"></i>
                                {currentEvent.Venue ? <p>{`Location of Venue: ${currentEvent.Venue.address}, ${currentEvent.Venue.city}, ${currentEvent.Venue.state}`}</p> : <h4>Location will be updated soon</h4>}
                            </div>
                            <div id='icon-container'>
                                <i class="fa-regular fa-credit-card"></i>
                                <p>{` Price: $${currentEvent.price}`}</p>
                            </div>
                            <div id='icon-container'>
                                <i class="fa-solid fa-person"></i>
                                <p>{`Event Capacity: ${currentEvent.capacity}`}</p>
                            </div>
                            <div id='icon-container'>
                                <i class="fa-regular fa-clock"></i>
                                <p>{`Time of Event: ${newStartDate} at ${newStartDateTime} - ${newEndDate} at ${newEndDateTime}`}</p>
                            </div>
                            <div id='icon-container'>
                                <i class="fa-regular fa-calendar-days"></i>
                                <p>{`Type of Event: ${currentEvent.type}`}</p>
                            </div>

                        </div>
                    </div>
                    <div id='divider'></div>
                    <br/>
                    <div className='button-container'>
                        {sessionUser && <button className='button-design'>
                            <Link to={'/groups/new'} id='link-button'>Start a New Group</Link>
                        </button>}
                        <button className='button-design'>
                            <Link to={'/groups'} id='link-button'>Groups</Link>
                        </button>
                        <button className='button-design'>
                            <Link to={'/events'} id='link-button'>Events</Link>
                        </button>
                        {sessionUser && <button className='button-design'>
                            <Link to={`/events/${groupIdObj.id}/new`} id='link-button'>Create New Event</Link>
                        </button>}
                        {sessionUser && currentGroup && sessionUser.id === currentGroup.organizerId && <button onClick={() => deleteEventhandler(eventId)} className='button-design'>Delete Event</button>}
                    </div>
                </div>
            </>
        )
}

export default EventDetailsComponent
