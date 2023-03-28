import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editUserThunk } from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import DeleteUserModal from '../DeleteUserModal';
import './EditProfileComponent.css'


function EditProfileComponent() {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const [firstName, setFirstName] = useState(sessionUser.firstName)
    const [lastName, setLastName] = useState(sessionUser.lastName)
    const [pictureUrl, setPictureUrl] = useState(sessionUser.picture_url)
    const [validationErrors, setValidationErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updateProfile = {
            firstName,
            lastName,
            picture_url: pictureUrl
        }

        return dispatch(editUserThunk(updateProfile))
            .then(() => history.push('/my-profile'))
    }

    if (sessionUser === null) history.push('/')
    return (
        <div className='edit-profile-container'>
            <br />
            <form id='universal-form-container' onSubmit={handleSubmit}>
                <div id='form-container-div'>
                    <fieldset id='form-container-fieldset'>

                        <h1 id='form-title'>Edit Profile</h1>
                        {/* <ul>
                        {validationErrors.length > 0 && validationErrors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul> */}
                        <div className='profile-form-container'>
                            <label id='label-container'>
                                First Name
                                <input
                                    id='input-field'
                                    type='text'
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                    placeholder='First Name'
                                    name='Name'
                                    required
                                />
                            </label>
                            <label id='label-container'>
                                Last Name
                                <input
                                    id='input-field'
                                    type='text'
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                    placeholder='Last Name'
                                    name='Name'
                                    required
                                />
                            </label>
                            <label id='label-container'>
                                Profile Picture
                                <input
                                    id='input-field'
                                    type='text'
                                    onChange={(e) => setPictureUrl(e.target.value)}
                                    value={pictureUrl}
                                    placeholder='Last Name'
                                    name='Name'
                                    required
                                />
                            </label>
                        </div>
                        <button className='button-design' type='submit' disabled={validationErrors.length > 0}>Submit</button>
                        <button className='button-design' onClick={() => history.push(`/my-profile`)}>Go back to Profile Page</button>
                    </fieldset>
                </div>
            </form>
                        <OpenModalButton
                            buttonText='Delete Account'
                            modalComponent={<DeleteUserModal />}
                        />
        </div>
    )
}

export default EditProfileComponent
