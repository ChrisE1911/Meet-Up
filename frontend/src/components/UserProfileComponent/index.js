import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getGroups } from '../../store/group';
import ProfileGroupCard from '../ProfileGroupCard';
import './UserProfile.css'

function UserProfileComponent() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const allGroups = useSelector(state => state.groups.allGroups)
    const allGroupsArr = Object.values(allGroups)
    const userGroups = allGroupsArr.filter(group => group.organizerId === sessionUser.id)

    console.log(userGroups)


    useEffect(() => {
        dispatch(getGroups())
    }, [dispatch])


    return (
        <div className="profile-container">
            <div id='main-profile-info'>
                <img alt='profile-pic'></img>
                <div id='user-information'>
                <h1>{`${sessionUser.firstName} ${sessionUser.lastName}`}</h1>
                    <h3>{`Member since ${sessionUser.createdAt}`}</h3>
                    <h4>{`Attended ___ events` }</h4>
                </div>
            </div>
            <div id='middle-bar'>
                <div id='profile-subtitles'>
                <div>Groups</div>
                <div>Events</div>
                </div>
                <div id='profile-edit-button'>
                    <button className='button-design'>Edit Profile</button>
                </div>
            </div>
            <div id='seperation-line'></div>
            <div id='profile-groups-info'>
                <h1>Groups</h1>
                <div id='user-groups'>
                    {userGroups.map((group) => {
                        return <ProfileGroupCard key={group.id} group={group} />
                    })}
                </div>
            </div>
            <div id='seperation-line'></div>
            <div id='profile-events-info'>
            <h1>Events</h1>
            </div>

        </div>
    )
}

export default UserProfileComponent
