import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from '../../store/group.js';
import { useEffect } from 'react';
import GroupComponentCard from '../GroupComponentCard/GroupComponentCard.js';
import { Link, NavLink } from 'react-router-dom';
import './GroupsComponent.css';


function GroupsComponent() {
    const dispatch = useDispatch();
    const allGroups = useSelector(state => state.groups.allGroups)

    const sessionUser = useSelector(state => state.session.user)

    const allGroupsArr = Object.values(allGroups)


    useEffect(() => {
        dispatch(getGroups(allGroups))
    }, [dispatch])


    if (allGroupsArr.length === 0) return null;
    else {
        return (
            <>
                <div className='toggle-buttons-container'>
                    <div className='toggle-buttons'>
                        <Link to={'/events'} activeStyle={{ color: 'teal', fontSize: '25px'}}>
                            <button className='events-button'>
                                Events
                            </button>
                        </Link>
                        <NavLink to={'/groups'} activeStyle={{ color: 'teal', fontSize: '25px'}}>
                            {/* <button className='groups-button'> */}
                                Groups
                            {/* </button> */}
                        </NavLink>
                    </div>
                </div>
                <div id='card-container'>
                    {!allGroupsArr && <span>No Groups available right now</span>}
                    <ul>
                        {allGroupsArr.map((group) => {
                            return <GroupComponentCard key={group.id} group={group} />
                        })}
                    </ul>
                </div>
            </>
        )
    }
}

export default GroupsComponent;
