import { Link } from "react-router-dom";

function EventCardComponent({ event }) {
    // console.log(event)
    return (
        <>
                <Link to={`/events/${event.id}`} id="group-card">
                    <img src={event.previewImage} style={{ width: '100px', height: '100px' }}></img>
                    <div>{event.name}</div>
                </Link>
        </>
    )
}


export default EventCardComponent
