import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editProfileThunk } from '../../store/profile';
import './EditProfileComponent.css'


function EditProfileComponent() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updateProfile = {
            //something
        }

        return dispatch(editProfileThunk(updateProfile))
        .then(() => history.push('/my-profile'))
    }
    return (
        <h1>Hello World</h1>
    )
}

export default EditProfileComponent
