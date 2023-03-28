import { Link } from "react-router-dom"


function SearchCardComponent({ item }) {

    return (
        <Link to={`/events/${item.id}`}>
        {item.name}
        </Link>
    )
}

export default SearchCardComponent
