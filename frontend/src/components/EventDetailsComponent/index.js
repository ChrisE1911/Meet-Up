import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOneEvent } from '../../store/event';
import { getOneGroup } from '../../store/group';
import { getGroups } from '../../store/group';


function EventDetailsComponent() {
    const dispatch = useDispatch()

    const { eventId } = useParams();
    const currentGroup = useSelector(state => state.groups.singleGroup)
    const currentEvent = useSelector(state => state.events.singleEvent)
    const sessionUser = useSelector(state => state.session.user)
    const allGroups = useSelector(state => state.groups.allGroups)
    const allGroupsArr = Object.values(allGroups)
    const groupId = allGroupsArr.find((group) => group.organizerId === sessionUser.id)
    let groupIdObj = Object.assign({}, groupId)

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




    return (
        <>
            <br />
            <br />
            {currentEvent.EventImages && <img src={currentEvent.EventImages[0]} alt='Event'></img>}
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

            <h3>{currentEvent.startDate}</h3>
            <h3>{currentEvent.endDate}</h3>

            {sessionUser && <Link to={'/groups/new'}>Start a New Group</Link>}
            <Link to={'/groups'}>Groups</Link>
            <Link to={'/events'}>Events</Link>
            <Link to={`/events/${groupIdObj.id}/new`}>Create New Event</Link>
        </>
    )
}

export default EventDetailsComponent
