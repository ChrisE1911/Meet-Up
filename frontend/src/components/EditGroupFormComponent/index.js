import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editOneGroup } from '../../store/group';
import { getOneGroup } from '../../store/group.js';


function EditGroupFormComponent() {
    const currentGroup = useSelector(state => state.groups.singleGroup)
    const [name, setName] = useState(currentGroup.name);
    const [about, setAbout] = useState(currentGroup.about);
    const [type, setType] = useState(currentGroup.type.toString());
    const [privateGroup, setPrivateGroup] = useState(currentGroup.private.toString());
    const [city, setCity] = useState(currentGroup.city);
    const [state, setState] = useState(currentGroup.state);
    const [validationErrors, setValidationErrors] = useState([])
    const dispatch = useDispatch();
    const history = useHistory()
    const { groupId } = useParams();

    console.log(currentGroup)

    useEffect(() => {
        dispatch(getOneGroup(groupId))
    }, [dispatch])

    useEffect(() => {
        const errors = [];

        if (name.length > 60) {
            errors.push('Name must be 60 characters or less')
        }

        if (state.length !== 2 || (!state.toUpperCase())) {
            errors.push('State must be 2 characters and Uppercase. Ex: NC, TX, CA');
        }

        if (about.length < 50) {
            errors.push("About must be 50 characters or more")
        }

        if (type !== 'Online' && type !== 'In Person') {
            errors.push("Type must be 'Online' or 'In person'")
        }

        if (privateGroup !== 'true' && privateGroup !== 'false') {
            errors.push("Please specify if your group will be Private or Public")
        }

        if (city.length === 0) {
            errors.push("City is required")
        }

        setValidationErrors(errors);

    }, [name, state, about, type, city, privateGroup])


    const handleSubmit = (e) => {
        e.preventDefault();
        const updatingGroup = {
            id: groupId,
            name,
            about,
            type,
            private: privateGroup,
            city,
            state
        }

        return dispatch(editOneGroup(updatingGroup))
            .then(() => history.push(`/groups/${groupId}`))
    };



    return (
        <>
        <br />
        <form id='universal-form-container' onSubmit={handleSubmit}>
            <div id='form-container-div'>
                <fieldset id='form-container-fieldset'>

                    <h1 id='form-title'>Edit Group</h1>
                    <ul>
                        {validationErrors.length > 0 && validationErrors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <input
                         id='input-field'
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder='Name'
                        name='Name'
                        required
                    />
                    <div>
                        <label>
                            <input
                                type='radio'
                                value='true'
                                name='Group'
                                onChange={(e) => setPrivateGroup(e.target.value)}
                                checked={privateGroup === `${true}`}
                                required
                            /> Private
                        </label>
                        <label>
                            <input
                                type='radio'
                                value='false'
                                name='Group'
                                onChange={(e) => setPrivateGroup(e.target.value)}
                                checked={privateGroup === `${false}`}
                                required
                            /> Public
                        </label>
                    </div>
                    <input
                         id='input-field'
                        type='text'
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        placeholder='City'
                        name='City'
                        required
                    />
                    <input
                         id='input-field'
                        type='text'
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        placeholder='State'
                        name='State'
                        pattern='[A-Z]{2}'
                        maxLength={2}
                        required
                    />
                    <input
                         id='input-field'
                        type='text'
                        onChange={(e) => setAbout(e.target.value)}
                        value={about}
                        placeholder='Tell us about your Group'
                        name='Group'
                        required
                    />
                    <div>
                        <label>
                            <input
                                type='radio'
                                value='Online'
                                name='Type'
                                onChange={(e) => setType(e.target.value)}
                                checked={type === 'Online'}
                                required
                            /> Online
                        </label>
                        <label>
                            <input
                                type='radio'
                                value='In Person'
                                name='Type'
                                onChange={(e) => setType(e.target.value)}
                                checked={type === 'In Person'}
                                required
                            /> In person
                        </label>
                    </div>
                    <button className='button-design' type='submit' disabled={validationErrors.length > 0}>Submit</button>
                    <button className='button-design' onClick={() => history.push(`/groups/${groupId}`)}>Go back to Group Details Page</button>
                </fieldset>
            </div>
        </form>
    </>
    );
}


export default EditGroupFormComponent
