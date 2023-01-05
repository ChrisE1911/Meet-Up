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

    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getOneGroup(groupId))
    }, [dispatch, groupId])

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
                        <h3>{`${currentGroup.numMembers} members ${currentGroup.private ? 'Private' : 'Public'} group`}</h3>
                        <h3>{currentGroup.type}</h3>
                        {currentGroup.Organizer && <h3>{`Organized by ${currentGroup.Organizer.firstName} ${currentGroup.Organizer.lastName}`}</h3>}
                    </div>
                </div>
                {/*Conditional rendering of the Organizer*/}
                <br />
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
                <h2>What we're about</h2>
                <p>{currentGroup.about}</p>
            </div>
        </>

    )
}

export default GroupDetailsComponent
