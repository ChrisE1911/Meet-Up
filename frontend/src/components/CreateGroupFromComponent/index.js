import { useState } from 'react';
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


    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = []

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
        console.log('Test')
        dispatch(createAGroup(group, image));
        reset();

        history.push('/groups')
    }

    const reset = () => {
        setName('')
        setAbout('')
        setType('In person')
        setPrivateGroup(true)
        setCity('')
        setState('')
    }


    return (
        <div>
            <h1>Create Group</h1>
            <form onSubmit={handleSubmit}>
                <ul>
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
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default CreateGroupFormComponent
