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
            <div>
                <br />
                <br />
                <br />
                {currentGroup.GroupImages && <img src={currentGroup.GroupImages[0].url} alt='preview'></img>}
                <h1>{currentGroup.name}</h1>
                <h3>{`${currentGroup.numMembers} members ${currentGroup.private ? 'Private' : 'Public'} group`}</h3>
                <h3>{currentGroup.type}</h3>
                {/*Conditional rendering of the Organizer*/}
                {currentGroup.Organizer && <h3>{`Organized by ${currentGroup.Organizer.firstName} ${currentGroup.Organizer.lastName}`}</h3>}
                <h2>What we're about</h2>
                <p>{currentGroup.about}</p>
                <div className='button-container'>
                    {sessionUser &&
                        <button>
                            <Link to={'/groups/new'} id='link-button'>Start a New Group</Link>
                        </button>}
                    <button>
                        <Link to={'/groups'} id='link-button'>Groups</Link>
                    </button>
                    <button>
                        <Link to={'/events'} id='link-button'>Events</Link>
                    </button>
                    {sessionUser && currentGroup.Organizer && sessionUser.id === currentGroup.Organizer.id &&
                        <button>
                            <Link to={`/groups/${currentGroup.id}/edit`} id='link-button'>Edit Group</Link>
                        </button>}
                </div>
            </div>
        </>

    )
}

export default GroupDetailsComponent
