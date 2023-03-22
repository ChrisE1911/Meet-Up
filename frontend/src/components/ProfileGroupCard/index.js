import { Link } from "react-router-dom";
import './ProfileGroupCard.css'

function ProfileGroupCard({ group }) {

    return (
        <>

            <div id="group-card">
                <Link to={`/groups/${group.id}`}>
                    <img src={group.previewImage} style={{ width: '100px', height: '100px' }}></img>
                    <div>{group.name}</div>
                </Link >
            </div>
        </>
    )
}


export default ProfileGroupCard
