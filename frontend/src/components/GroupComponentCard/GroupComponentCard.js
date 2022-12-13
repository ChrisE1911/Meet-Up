import { Link } from 'react-router-dom'
import './GroupComponentCard.css'

const GroupComponentCard = ({ group }) => {


    console.log('single group object', group)
    return (
        <Link to={`/groups/${group.id}`} className='group-component-card'>
            <h3>{group.name}</h3>
            <p>{group.about}</p>

            <p>{`${group.numMembers} members ${group.private ? "Private" : "Public"}`}</p>
        </Link>
    )
}


export default GroupComponentCard
