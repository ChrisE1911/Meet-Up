import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteUserThunk } from "../../store/session";
import * as sessionActions from '../../store/session';


function DeleteUserModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)

    const { closeModal } = useModal();

    const deleteSubmit = (e) => {
        e.preventDefault();

        dispatch(deleteUserThunk(+sessionUser.id));
        dispatch(sessionActions.logout());
        history.push('/');
        closeModal();

    }

    return (
        <>
        <div className="input-fields">
          <form id='form-container' onSubmit={deleteSubmit}>
        <h1>WE'RE SAD TO SEE YOU GO...</h1>
          <label>
              Are you sure you want to delete your account?
          </label>
            <div className="login-signup-button-container">
              <button className="button-design" type="submit"> Yes, delete my account</button>
            </div>
        </form>
        </div>
      </>
      );
}

export default DeleteUserModal
