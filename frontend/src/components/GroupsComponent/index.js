import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from '../../store/group.js';
import { useEffect } from 'react';
import GroupComponentCard from '../GroupComponentCard/GroupComponentCard.js';
import { Link } from 'react-router-dom';


function GroupsComponent() {
    const dispatch = useDispatch();
    const allGroups = useSelector(state => state.groups.allGroups)

    const allGroupsArr = Object.values(allGroups)

    console.log(allGroupsArr)

    useEffect(() => {
        dispatch(getGroups(allGroups))
    }, [dispatch])

    return (
        <>
            <Link to={'/groups'}>Groups</Link>
            <Link to={'/events'}>Events</Link>
            {!allGroupsArr && <span>No Groups available right now</span>}
            <ul>
                {allGroupsArr.map((group) => {
                    return <GroupComponentCard key={group.id} group={group} />
                })}
            </ul>
            <Link to={'/groups/new'}>Create Group</Link>
        </>
    )
}

export default GroupsComponent;
