import { Link } from 'react-router-dom'
import './GroupComponentCard.css'

const GroupComponentCard = ({ group }) => {


    return (
        <Link to={`/groups/${group.id}`} className='group-component-card'>
            <div className='group-component-card-image'>
                <img src={group.previewImage} alt='Group' className='card-image' ></img>
            </div>
            <div className='group-component-card-details'>
                <div className='name-and-location'>
                <div style={{fontWeight: '700', fontSize: 'large'}}>{group.name}</div>
                <div className='location'>{`${group.city} ${group.state}`}</div>
                </div>
                <div>
                    <p>{group.about}</p>
                    <br/>
                    <br/>
                <p>{`${group.numMembers} members ${group.private ? "Private" : "Public"}`}</p>
                </div>
            </div>
        </Link>
    )
}


export default GroupComponentCard
