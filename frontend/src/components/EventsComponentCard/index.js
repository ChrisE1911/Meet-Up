import { Link } from 'react-router-dom'
import './EventComponentCard.css'

const EventsComponentCard = ({ event }) => {

    const newStartDate = new Date(event.startDate).toDateString().split(' ').slice(0, 3)
    const newStartDateTime = new Date(event.startDate).toLocaleString().split(',')[1]



    return (
        <Link to={`/events/${event.id}`} className='group-component-card'>
            <div className='group-component-card-image'>
                <img src={event.previewImage} alt='event' className='card-image' ></img>
            </div>
            <div className='group-component-card-details'>
                <div className='name-and-location'>
                    <div className='location'>{`${newStartDate} ${newStartDateTime} CST`}</div>
                    <p style={{fontWeight: '700'}}>{event.name}</p>
                    <p>{`${event.Group?.name}`}</p>
                    <p>{`${event.Venue?.city}, ${event.Venue?.state}`}</p>
                </div>
                <br/>
                <br />
                <div>
                <div>{`${event.numAttending} attendees ${event.type} event`}</div>
                </div>
            </div>
        </Link>
    )
}


export default EventsComponentCard
