import { Link } from "react-router-dom";
import './ProfileGroupCard.css'

function ProfileGroupCard({ group }) {

    return (
        <>
                <Link to={`/groups/${group.id}`} id="group-card">
                    <img src={group.previewImage} style={{ width: '100px', height: '100px' }}></img>
                    <div>{group.name}</div>
                </Link>
        </>
    )
}


export default ProfileGroupCard
