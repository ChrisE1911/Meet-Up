import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAGroup } from '../../store/group.js';


function CreateGroupFormComponent() {
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [type, setType] = useState('In person');
    const [privateGroup, setPrivateGroup] = useState(true);
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [validationErrors, setValidationErrors] = useState([])
    const [previewImage, setPreviewImage] = useState('')
    const dispatch = useDispatch();
    const history = useHistory()
    console.log('validation Errors', validationErrors)
    useEffect(() => {
        let errors = [];

        if (name.length < 3) {
            errors.push('Name must be more than 3 characters')
        }
        setValidationErrors((prev) => [...prev, ...errors]);
    }, [name])


    const handleSubmit = (e) => {
        e.preventDefault();
        const group = {
            name,
            about,
            type,
            private: privateGroup,
            city,
            state
        }

        const image = {
            url: previewImage,
            "preview": true
        }

        return dispatch(createAGroup(group, image))
        .then(()=> history.push('/groups'))
            .catch( async (res) => {
                const data = await res.json();
                console.log('Data', data)
                if (data && data.errors) {
                    setValidationErrors((prev) => [...prev, ...data.errors])
                    console.log('validation Errors in catch block', validationErrors)
                }
            }
        )

    };



    return (
        <div>
            <h1>Create Group</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {validationErrors.length > 0 && validationErrors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <input
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder='Name'
                    name='Name'
                />
                <input
                    type='text'
                    onChange={(e) => setPrivateGroup(e.target.value)}
                    value={privateGroup}
                    placeholder='Private or Public Group?'
                    name='Group'
                />
                <input
                    type='text'
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    placeholder='City'
                    name='City'
                />
                <input
                    type='text'
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    placeholder='State'
                    name='State'
                />
                <input
                    type='text'
                    onChange={(e) => setAbout(e.target.value)}
                    value={about}
                    placeholder='Tell us about your Group'
                    name='Group'
                />

                <input
                    type='text'
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                    placeholder='Online or In person'
                    name='Type'
                />
                <input
                    type='text'
                    onChange={(e) => setPreviewImage(e.target.value)}
                    value={previewImage}
                    placeholder='Image'
                    name='Image'
                />
                <button type='submit' disabled={validationErrors > 0}>Submit</button>
            </form>
        </div>
    );
}


export default CreateGroupFormComponent
