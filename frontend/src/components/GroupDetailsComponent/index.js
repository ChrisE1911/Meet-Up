import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOneGroup } from '../../store/group.js';
import './GroupDetailsComponent.css';


function GroupDetailsComponent() {
    const dispatch = useDispatch()
    const { groupId } = useParams();

    const currentGroup = useSelector(state => state.groups.singleGroup)
    const currentGroupArr = Object.values(currentGroup)

    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getOneGroup(groupId))
    }, [dispatch, groupId])


    if (currentGroupArr.length === 0) return null;
    else {
        return (
            <>
                <div className='group-container'>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
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
                            </button>}
                    </div>
                </div>
            </>

        )
    }
}

export default GroupDetailsComponent
