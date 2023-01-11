import './SplashPageComponent.css';
import { NavLink } from 'react-router-dom';



function SplashPageComponent() {
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
        </div>
    )
}

export default SplashPageComponent
