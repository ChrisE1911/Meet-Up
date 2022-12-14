import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOneGroup } from '../../store/group.js';


function GroupDetailsComponent() {
    const dispatch = useDispatch()

    const { groupId } = useParams();

    const currentGroup = useSelector(state => state.groups.singleGroup)

    console.log(currentGroup)

    useEffect(() => {
        dispatch(getOneGroup(groupId))
    }, [dispatch])


    return (
        <div>
            <h1>Hello World</h1>
            {/* // console.log(currentGroup.GroupImages[0].url) */}
            {currentGroup.GroupImages && <img src={currentGroup.GroupImages[0].url} alt='preview'></img>}
            <br />
            <br />
            <br />
            <h1>{currentGroup.name}</h1>
            <h3>{`${currentGroup.numMembers} members ${currentGroup.private ? 'Private' : 'Public'} group`}</h3>
            <h3>{`Organized by ${currentGroup.Organizer.firstName} ${currentGroup.Organizer.lastName}`}</h3>
            <br />
            <br />
            <br />
            <br />
            <h2>What we're about</h2>
            <p>{currentGroup.about}</p>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Link to={'/groups/new'}>Start a New Group</Link>
        </div>

    )
}

export default GroupDetailsComponent
