import { Link } from 'react-router-dom'
import './EventComponentCard.css'

const EventsComponentCard = ({ event }) => {

    return (
        <Link to={`/events/${event.id}`} className='event-component-card'>
            <img src={event.previewImage} alt='event' style={{width: '100px'}} ></img>
            <h3>{event.name}</h3>
            <p>{event.about}</p>

            <p>{`${event.numMembers} members ${event.private ? "Private" : "Public"}`}</p>
        </Link>
    )
}


export default EventsComponentCard
