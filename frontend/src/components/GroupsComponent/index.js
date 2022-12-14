import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from '../../store/group.js';
import { useEffect } from 'react';
import GroupComponentCard from '../GroupComponentCard/GroupComponentCard.js';
import { Link } from 'react-router-dom';
import './GroupsComponent.css';


function GroupsComponent() {
    const dispatch = useDispatch();
    const allGroups = useSelector(state => state.groups.allGroups)

    const sessionUser = useSelector(state => state.session.user)

    const allGroupsArr = Object.values(allGroups)

    console.log(allGroupsArr)

    useEffect(() => {
        dispatch(getGroups(allGroups))
    }, [dispatch])

    return (
        <>
                <div id='toggle-buttons'>
                    <Link to={'/events'}>Events</Link>
                    <Link to={'/groups'}>Groups</Link>
                </div>
            <div id='card-container'>
                {!allGroupsArr && <span>No Groups available right now</span>}
                <ul>
                    {allGroupsArr.map((group) => {
                        return <GroupComponentCard key={group.id} group={group} />
                    })}
                </ul>
                { sessionUser && <Link to={'/groups/new'}>Create Group</Link>}
            </div>
        </>
    )
}

export default GroupsComponent;
