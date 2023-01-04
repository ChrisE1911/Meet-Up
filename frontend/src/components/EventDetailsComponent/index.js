import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOneEvent } from '../../store/event';
import { getOneGroup } from '../../store/group';
import { getGroups } from '../../store/group';
import { useHistory } from 'react-router-dom';
import { deleteEvent } from '../../store/event';


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
            <div>

                <br />
                <br />
                <br />
                <br />
                {currentEvent.EventImages && <img src={currentEvent.EventImages[0].url} alt='Event'></img>}
                {currentEvent.name && <h1>{currentEvent.name}</h1>}
                {currentEvent.Group && <p>{`Hosted by ${currentEvent.Group.name}`}</p>}
                <p>Details</p>
                <p>{currentEvent.description}</p>
                <p>{currentEvent.type}</p>
                <p>{currentEvent.capacity}</p>
                <p>
                    {currentEvent.numAttending && <h3>{currentEvent.numAttending}</h3>}
                </p>
                {currentEvent.Venue && <h3>{`${currentEvent.Venue.city} ${currentEvent.Venue.state}`}</h3>}
                <h3>
                    {currentEvent.price}
                </h3>

                <h3>{`${newStartDate} at ${newStartDateTime} - end time`}</h3>
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
