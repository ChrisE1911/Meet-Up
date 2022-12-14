import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const homeTitle = 'M Rendezvous U';

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <span>
        <ProfileButton user={sessionUser} />
      </span>
    );
  } else {
    sessionLinks = (
      <span>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </span>
    );
  }

  return (
    <div className='navigation-bar'>
      <span>
        <NavLink exact to="/">{homeTitle}</NavLink>
      </span>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
