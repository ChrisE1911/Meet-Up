import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOneGroup } from '../../store/group.js';
import { deleteGroup } from '../../store/group.js';
import { getEvents } from '../../store/event';
import './GroupDetailsComponent.css';


function GroupDetailsComponent() {
    const dispatch = useDispatch()
    const { groupId } = useParams();
    const history = useHistory()

    const currentGroup = useSelector(state => state.groups.singleGroup)
    const currentGroupArr = Object.values(currentGroup)

    const allEvents = useSelector(state => state.events.allEvents)

    const allEventsArr = Object.values(allEvents)

    const filteredEventsArr = allEventsArr.filter((event) => Number(groupId) === event.groupId)

    console.log(filteredEventsArr)

    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getOneGroup(groupId))
    }, [dispatch, groupId])

    useEffect(() => {
        dispatch(getEvents(allEvents))
    }, [dispatch])


    const deleteGrouphandler = async (groupId) => {

        await dispatch(deleteGroup(+groupId))

        history.push('/groups');

        alert('Group successfully deleted');
    }


    if (currentGroupArr.length === 0) return null;
    else {
        return (
            <>
                <div className='group-container'>
                    <div id='group-information'>
                        {currentGroup.GroupImages && <img src={currentGroup.GroupImages[0].url} alt='preview'></img>}
                        <div id='group-information-div'>
                            <h1>{currentGroup.name}</h1>
                            <div id='icon-container'>
                                <i className="fa-solid fa-location-pin"></i>
                                <p>{`${currentGroup.city}, ${currentGroup.state}`}</p>
                            </div>
                            <div id='icon-container'>
                                <i className="fa-solid fa-person"></i>
                                <p>{`${currentGroup.numMembers} members - ${currentGroup.private ? 'Private' : 'Public'} - ${currentGroup.type} group`}</p>
                            </div>
                            <div id='icon-container'>
                                <i className="fa-regular fa-face-smile"></i>
                                {currentGroup.Organizer && <p>{`Organized by ${currentGroup.Organizer.firstName} ${currentGroup.Organizer.lastName}`}</p>}
                            </div>
                        </div>
                    </div>
                    <br />
                    <div id='group-description'>
                        <h3>What we're about</h3>
                        <p>{currentGroup.about}</p>
                    </div>
                    <h3 style={{ marginLeft: '10vw' }}>Events</h3>
                    {filteredEventsArr.map(filteredEvent => (
                        <div style={{ width: '80vw', marginLeft: '10vw', marginRight: '10vw', overflowX: 'scroll', paddingBottom: '10px'}}>
                            <Link to={`/events/${filteredEvent.id}`} id='event-carousel' style={{ width: '300px', height: '200px', textAlign: 'center', padding: '10px', textDecoration: 'none', color: 'black'}}>
                                <img src={filteredEvent.previewImage} alt='preview-image' style={{ width: '100%', height: '80%' }}></img>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '1%' }}>
                                    <div style={{ width: '200px' }}>{filteredEvent.name}</div>
                                    <i class="fa-solid fa-arrow-right" style={{ color: 'teal' }}></i>
                                </div>
                            </Link>
                        </div>
                    ))}
                    <br />
                    <div id='divider'></div>
                    <br />
                    <div className='button-container'>
                        {sessionUser &&
                            <button className='button-design'>
                                <Link to={'/groups/new'} id='link-button'>Start a New Group</Link>
                            </button>}
                        <button className='button-design'>
                            <Link to={'/groups'} id='link-button'>Groups</Link>
                        </button>
                        <button className='button-design'>
                            <Link to={'/events'} id='link-button'>Events</Link>
                        </button>
                        {sessionUser && currentGroup.Organizer && sessionUser.id === currentGroup.Organizer.id &&
                            <button className='button-design'>
                                <Link to={`/groups/${currentGroup.id}/edit`} id='link-button'>Edit Group</Link>
                            </button>
                        }
                        {sessionUser && currentGroup.Organizer && sessionUser.id === currentGroup.Organizer.id &&
                            <button className='button-design' onClick={() => deleteGrouphandler(currentGroup.id)}>Delete Group</button>
                        }
                        {sessionUser && currentGroup.Organizer && sessionUser.id === currentGroup.Organizer.id &&
                            <button className='button-design' onClick={() => history.push(`/events/${currentGroup.id}/new`)}>Create Event</button>
                        }
                    </div>
                </div>
            </>

        )
    }
}

export default GroupDetailsComponent
