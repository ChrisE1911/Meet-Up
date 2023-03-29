import { useHistory } from "react-router-dom"


function SearchCardComponent({ item, clear }) {

    const history = useHistory()

    return (
        <li onClick={() => {
            history.push(`/events/${item.id}`);
            clear()
        }} className="list-item">
            {item.name}
        </li>
    )
}

export default SearchCardComponent
