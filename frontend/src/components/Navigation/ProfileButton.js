// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false)
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (openProfile) return;
    setOpenProfile(true);
  };

  useEffect(() => {
    if (!openProfile) return;

    const closeMenu = (e) => {
      if (!ulRef?.current?.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [openProfile]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/groups')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const firstNameString = `${user.firstName}`

  const profileButtonLetter = firstNameString.charAt(0)

  console.log('STRINGGGGG', profileButtonLetter)



  return (
    <>
      <div>
        <button className="profile-button" onClick={() => setOpenProfile((prev) => !prev)}>
          {/* <i className="fas fa-user-circle" /> */}
          <div style={{ fontWeight: "600" }}>{profileButtonLetter}</div>
        </button>
        {openProfile && <div className="profile-dropdown-container">
          <ul className={ulClassName} ref={ulRef}>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout} className='logout-button'>Log Out</button>
            </li>
          </ul>
        </div>}
      </div>
    </>
  );
}

export default ProfileButton;
