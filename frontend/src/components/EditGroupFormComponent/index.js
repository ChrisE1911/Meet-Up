import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';
import { editOneGroup } from '../../store/group';


function EditGroupFormComponent() {
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [type, setType] = useState('In person');
    const [privateGroup, setPrivateGroup] = useState(true);
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [validationErrors, setValidationErrors] = useState([])
    const dispatch = useDispatch();
    const history = useHistory()
    const { groupId } = useParams();


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
        .then(()=> history.push(`/groups/${groupId}`))
        .catch( async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setValidationErrors(data.errors)
            }
        }
        )

    };



    return (
        <div>
            <br/>
            <br/>
            <br/>
            <h1>Edit Group</h1>
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
                    type='dropdown'
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                    placeholder='Online or In person'
                    name='Type'
                />
                <button type='submit' disabled={validationErrors.length > 0}>Submit</button>
            </form>
        </div>
    );
}


export default EditGroupFormComponent
