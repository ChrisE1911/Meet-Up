import './SplashPageComponent.css';
import { NavLink } from 'react-router-dom';
import { getEvents } from '../../store/event';
import { getGroups } from '../../store/group';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import FooterComponent from '../FooterComponent';





function SplashPageComponent() {

    const dispatch = useDispatch();

    const history = useHistory();

    const allEvents = useSelector(state => state.events.allEvents)

    const allGroups = useSelector(state => state.groups.allGroups)

    const sessionUser = useSelector(state => state.session.user)

    const allEventsArr = Object.values(allEvents)

    const allGroupsArr = Object.values(allGroups)

    useEffect(() => {
        dispatch(getEvents(allEvents))
    }, [dispatch])

    useEffect(() => {
        dispatch(getGroups(allGroups))
    }, [dispatch])



    return (
        <div className='splash-container'>
            <div id='splash-info'>
                <div id='splash-title-and-picture'>
                    <div>
                        <h1>The Platform with all of your Rendezvous needs </h1>
                        <span>Any activity or group you desire or seek to enjoy or join, we have it all here on Redezvous. <NavLink to={"/events"}>Events</NavLink> and <NavLink to={"/groups"}>Groups</NavLink> are being created all day every day. Log In or Sign up to learn more.</span>
                    </div>
                    <img src='https://img.freepik.com/free-vector/hand-drawn-business-communication-concept_52683-76159.jpg'></img>
                </div>
            </div>
            <br />
            <h1 style={{ marginLeft: '10vw' }}>Events</h1>
            <div style={{ display: 'flex', flexDirection: 'row', width: '80vw', marginLeft: '10vw', marginRight: '10vw', overflowX: 'scroll'}}>
                {allEventsArr.map((event) => {
                    return (
                        <Link to={`events/${event.id}`} id='event-carousel' style={{ width: '300px', height: '200px', textAlign: 'center', padding: '10px', textDecoration: 'none', color: 'black' }}>
                            <img src={event.previewImage} alt='preview-image' style={{ width: '100%', height: '80%' }}></img>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '1%' }}>
                                <div style={{ width: '200px' }}>{event.name}</div>
                                <i class="fa-solid fa-arrow-right" style={{ color: 'teal' }}></i>
                            </div>
                        </Link>
                    )
                })}
            </div>
            <h1 style={{ marginLeft: '10vw' }}>Groups</h1>
            <div style={{ display: 'flex', flexDirection: 'row', width: '80vw', marginLeft: '10vw', marginRight: '10vw', overflowX: 'scroll'}}>
                {allGroupsArr.map((group) => {
                    return (
                        <Link to={`groups/${group.id}`} id='event-carousel' style={{ width: '300px', height: '200px', textAlign: 'center', padding: '10px', textDecoration: 'none', color: 'black' }}>
                            <img src={group.previewImage} alt='preview-image' style={{ width: '100%', height: '80%' }}></img>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '1%' }}>
                                <div style={{ width: '200px' }}>{group.name}</div>
                                <i class="fa-solid fa-arrow-right" style={{ color: 'teal' }}></i>
                            </div>
                        </Link>
                    )
                })}
            </div>
            <br />
            <br />
            <br />
            <div style={{ width: '100vw', backgroundColor: 'darkgray', height: 'auto'}}>
                <FooterComponent />
            </div>

        </div>
    )
}

export default SplashPageComponent
