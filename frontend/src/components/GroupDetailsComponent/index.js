import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOneGroup } from '../../store/group.js';


function GroupDetailsComponent() {
    const dispatch = useDispatch()
    const { groupId } = useParams();

    const currentGroup = useSelector(state => state.groups.singleGroup)

    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getOneGroup(groupId))
    }, [dispatch])

    return (
        <>
            <div>
                <br/>
                <br/>
                <br/>
                {currentGroup.GroupImages && <img src={currentGroup.GroupImages[0].url} alt='preview'></img>}
                <h1>{currentGroup.name}</h1>
                <h3>{`${currentGroup.numMembers} members ${currentGroup.private ? 'Private' : 'Public'} group`}</h3>
                <h3>{currentGroup.type}</h3>
                {/*Conditional rendering of the Organizer*/}
                {currentGroup.Organizer && <h3>{`Organized by ${currentGroup.Organizer.firstName} ${currentGroup.Organizer.lastName}`}</h3>}
                <h2>What we're about</h2>
                <p>{currentGroup.about}</p>
                { sessionUser && <Link to={'/groups/new'}>Start a New Group</Link>}
                <Link to={'/groups'}>Groups</Link>
                <Link to={'/events'}>Events</Link>
                {sessionUser && currentGroup.Organizer && sessionUser.id === currentGroup.Organizer.id && <Link to={`/groups/${currentGroup.id}/edit`}>Edit Group</Link>}
            </div>
        </>

    )
}

export default GroupDetailsComponent
