import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import SearchBarComponent from '../SearchBarComponent';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const homeTitle = 'M Rendezvous U';

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div id='profile-button-container'>
        <Link className='nav-group-button' to="/groups/new">Start a new group!</Link>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className='session-buttons'>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    );
  }

  return (
    <div className='navigation-bar'>
      <div className='site-title'>
        <NavLink exact to="/" id='nav-title'>{homeTitle}</NavLink>
       <SearchBarComponent />
      </div>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
