// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";
import DemoUserLoginItem from '../DemoUserLogin';

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");


  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    history.push('/groups')
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );

  };

  return (
    <>
      <h1 id='log-in'>Log In</h1>
      <div className="input-fields">
        <form id='form-container' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
            Username or Email
            <div>
              <input
                id="username-pass-input-field"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
            </div>
        </label>
        <label>
            Password
            <div>
              <input
                id="username-pass-input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
            </div>
          </label>
          <div className="login-signup-button-container">
            <button className="button-design" type="submit">Log In</button>
           <DemoUserLoginItem>Demo User</DemoUserLoginItem>
          </div>
      </form>
      </div>
    </>
  );
}

export default LoginFormModal;
