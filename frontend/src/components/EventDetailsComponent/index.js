import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOneEvent } from '../../store/event';
import { getOneGroup } from '../../store/group';


function EventDetailsComponent() {
    const dispatch = useDispatch()

    const {eventId} = useParams()
    const currentGroup = useSelector(state => state.groups.singleGroup)
    const currentEvent = useSelector(state => state.events.singleEvent)
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getOneEvent(eventId))
    }, [dispatch, eventId])

    useEffect(() => {
        dispatch(getOneGroup(currentEvent.groupId))
    }, [dispatch, currentEvent.groupId])

    return (
        <>
            <br />
            <br />
            {currentEvent.EventImages && <img src={currentEvent.EventImages[0]} alt='Event'></img>}
            <h1>{currentEvent.name}</h1>
            {currentEvent.Group && <p>{`Hosted by ${currentEvent.Group.name}`}</p>}
            <h3>Details</h3>
            <p>{currentEvent.description}</p>
            <h3>{currentEvent.numAttending}</h3>
            {sessionUser && <Link to={'/groups/new'}>Start a New Group</Link>}
            <Link to={'/groups'}>Groups</Link>
            <Link to={'/events'}>Events</Link>
            {sessionUser && sessionUser.id === currentGroup.organizerId && (<Link to={`/events/${currentEvent.id}/edit`}>Edit Event</Link>)}
        </>
    )
}

export default EventDetailsComponent
