import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { getGroups } from '../../store/group';
import { getCurrentUserGroups } from '../../store/group';
import { getCurrentUserEvents } from '../../store/event';
import { getEvents } from '../../store/event';
import ProfileGroupCard from '../ProfileGroupCard';
import EventCardComponent from '../EventCardComponent';
import './UserProfile.css'

function UserProfileComponent() {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const allGroups = useSelector(state => state.groups.allGroups)
    const allGroupsArr = Object.values(allGroups)
    const allEvents = useSelector(state => state.events.allEvents)
    const allEventsArr = Object.values(allEvents)

    const userGroups = useSelector(state => state.groups.currentUserGroups)
    const userGroupsArr = Object.values(userGroups)


    console.log('USER GROUPS', allEventsArr)


    useEffect(() => {
        dispatch(getGroups()).then(dispatch(getEvents())).then(dispatch(getCurrentUserGroups()))
    }, [dispatch])


    return (
        <div className="profile-container">
            <div id='main-profile-info'>
                {<img src='https://tse3.mm.bing.net/th?id=OIP.7i35GvRSp092_L3KWHr4jgAAAA&pid=Api&P=0' alt='profile-pic'></img>}
                <div id='user-information'>
                    <h1>{`${sessionUser.firstName} ${sessionUser.lastName}`}</h1>
                    <h3>{`Member since ${sessionUser.createdAt}`}</h3>
                    <div id='user-profile-numEvents'>
                        <i className="fa-solid fa-person"></i>
                        <h5>{`Attended ___ events`}</h5>
                    </div>
                </div>
            </div>
            <div id='middle-bar'>
                <div id='profile-subtitles'>
                    <div>Groups</div>
                    <div>Events</div>
                </div>
                <div id='profile-edit-button'>
                    <button className='button-design' onClick={() => history.push('/my-profile/edit')}>Edit Profile</button>
                </div>
            </div>
            <div id='seperation-line'></div>
            <div id='profile-groups-info'>
                <h1>Groups</h1>
                <div id='user-groups'>
                    {userGroupsArr.map((group) => {
                        return <ProfileGroupCard key={group.id} group={group} />
                    })}
                </div>
            </div>
            <div id='seperation-line'></div>
            <div id='profile-events-info'>
                <h1>Events</h1>
                <div id='user-groups'>
                    {userGroupsArr.map((group) => (
                        <>
                        <Link to={`groups/${group.id}`}>{group.name}</Link>
                            {allEventsArr.filter((event) => event.groupId === group.id).map((filteredEvent) => {
                                return <EventCardComponent key={filteredEvent.id} event={filteredEvent} />
                            })}
                        </>
                    ))}
                </div>
                <div>

                </div>
            </div>

        </div>
    )
}

export default UserProfileComponent
