import { useHistory, useLocation } from "react-router-dom"



function SearchCardComponent({ item, clear }) {

    const history = useHistory()
    const location = useLocation()

    const eventLocation = location.pathname.includes("events")

    return (
        <>
            {eventLocation ?
                <li onClick={() => {
                    history.push(`/events/${item.id}`);
                    clear()
                }} className="list-item">
                {item.name}
                    </li>
                         : <li onClick={() => {
                history.push(`/groups/${item.id}`);
                clear()
            }} className="list-item">
                {item.name}
            </li>}
            </>
    )
}

export default SearchCardComponent
