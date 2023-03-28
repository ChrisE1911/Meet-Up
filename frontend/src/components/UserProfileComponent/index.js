import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, Link, NavLink } from 'react-router-dom';
import { useRef } from 'react';
import { getGroups } from '../../store/group';
import { getCurrentUserGroups } from '../../store/group';
import { getCurrentUserEvents } from '../../store/event';
import { getEvents } from '../../store/event';
import ProfileGroupCard from '../ProfileGroupCard';
import EventCardComponent from '../EventCardComponent';
import './UserProfile.css'

function UserProfileComponent() {
    const groups = useRef(null)
    const events = useRef(null)

    const scrollToSection = (elementRef) => {
        console.log(elementRef)
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: 'smooth'
        })
    }
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const allGroups = useSelector(state => state.groups.allGroups)
    const allGroupsArr = Object.values(allGroups)
    const allEvents = useSelector(state => state.events.allEvents)
    const allEventsArr = Object.values(allEvents)

    const userGroups = useSelector(state => state.groups.currentUserGroups)
    const userGroupsArr = Object.values(userGroups)

    let numberOfEventsArr = []
    // let eventsNumber = 0

    const memberDate = new Date(sessionUser.createdAt).toDateString().split(' ').slice(1, 4).join(' ')
    // console.log('DATE', memberDate.toDateString().split(' ').slice(1, 4).join(' '))


    useEffect(() => {
        dispatch(getGroups()).then(dispatch(getEvents())).then(dispatch(getCurrentUserGroups()))
    }, [dispatch])

    if (!sessionUser) return () => history.push('/') ;
    return (
        <div className="profile-container">
            <div id='main-profile-info'>
                {<img src={sessionUser.picture_url} style={{ width: '300px', height: '300px', borderRadius: '50%' }} alt='profile-pic'></img>}
                <div id='user-information'>
                    <h1>{`${sessionUser.firstName} ${sessionUser.lastName}`}</h1>
                    <h3>{`Member since ${memberDate}`}</h3>
                </div>
            </div>
            <div id='middle-bar'>
                <div id='profile-subtitles'>
                    <div id='ref-groups'>
                        <button id='user-profile-button' onClick={() => scrollToSection(groups)}>Groups</button>
                        <div id='circle-number'>
                            {userGroupsArr.length}
                        </div>
                    </div>
                    <div id='ref-events'>
                        <button id='user-profile-button' onClick={() => scrollToSection(events)}>Events</button>
                        <div id='circle-number'>
                            {userGroupsArr.map((group) => (
                                <>
                                    {allEventsArr.filter((event) => event.groupId === group.id).map((filteredEvent) => {
                                        numberOfEventsArr.push(filteredEvent);
                                    })}
                                </>
                            ))}
                            <div>{numberOfEventsArr.length}</div>
                        </div>
                    </div>
                </div>
                <div id='profile-edit-button'>
                    <button className='button-design' onClick={() => history.push('/my-profile/edit')}>Edit Profile</button>
                </div>
            </div>
            <div id='seperation-line'></div>
            <div id='profile-groups-info'>
                <h1 ref={groups}>Groups</h1>
                <div id='user-groups'>
                    {userGroupsArr.map((group) => {
                        return <ProfileGroupCard key={group.id} group={group} />
                    })}
                </div>
            </div>
            <div id='seperation-line'></div>
            <div id='profile-events-info'>
                <h1  ref={events}>Events</h1>
                <div>
                    {userGroupsArr.map((group) => (
                        <>
                            <Link to={`groups/${group.id}`} id='bold-description-group'>{group.name}</Link>
                            <br />
                            <br />
                            <div id='event-card-container'>
                                {allEventsArr.filter((event) => event.groupId === group.id).map((filteredEvent) => {

                                    return <EventCardComponent key={filteredEvent.id} event={filteredEvent} />
                                })}
                            </div>
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
