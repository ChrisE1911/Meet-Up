import { Link } from "react-router-dom";
import './ProfileGroupCard.css'

function ProfileGroupCard({ group }) {

    return (
        <Link to={`/groups/${group.id}`}>
            <div id="user-group-container">
                <div id="group-card">
                    <img src={group.previewImage} style={{ width: '100px', height: '100px' }}></img>
                    <div>{group.name}</div>
                </div>
            </div>
        </Link>
    )
}


export default ProfileGroupCard
