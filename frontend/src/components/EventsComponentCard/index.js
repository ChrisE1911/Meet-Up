import { Link } from 'react-router-dom'
import './EventComponentCard.css'

const EventsComponentCard = ({ event }) => {

    const newStartDate = new Date(event.startDate).toDateString().split(' ').slice(0, 3)
    const newStartDateTime = new Date(event.startDate).toLocaleString().split(',')[1]



    return (
        <Link to={`/events/${event.id}`} className='event-component-card'>
            <img src={event.previewImage} alt='event' style={{ width: '100px' }} ></img>
            <h3>{`${newStartDate} ${newStartDateTime} CST`}</h3>
            <h3>{event.name}</h3>
            <p>{event.Group?.name}</p>
            <p>{`${event.Venue?.city}, ${event.Venue?.state}`}</p>
            <p>{ }</p>

            <p>{`${event.numAttending} attendees`}</p>
            <p>{`${event.type} event`}</p>
        </Link>
    )
}


export default EventsComponentCard
