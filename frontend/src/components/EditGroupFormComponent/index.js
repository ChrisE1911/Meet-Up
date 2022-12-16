import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editOneGroup } from '../../store/group';
import { deleteGroup } from '../../store/group';
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
    }, [dispatch, groupId])




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
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setValidationErrors(data.errors)
                }
            }
            )

    };

    const deleteGrouphandler = async (groupId) => {

        await dispatch(deleteGroup(+groupId))

        history.push('/groups');
    }


    return (
        <div>
            <br />
            <br />
            <br />
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
                <div>
                    <label>
                        <input
                            type='radio'
                            value={`${true}`}
                            name='Group'
                            onChange={(e) => setPrivateGroup(e.target.value)}
                            checked={privateGroup === `${true}`}
                        /> Private
                    </label>
                    <label>
                        <input
                            type='radio'
                            value={`${false}`}
                            name='Group'
                            onChange={(e) => setPrivateGroup(e.target.value)}
                            checked={privateGroup === `${false}`}
                        /> Public
                    </label>
                </div>
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
                <div>
                    <label>
                        <input
                            type='radio'
                            value='Online'
                            name='Type'
                            onChange={(e) => setType(e.target.value)}
                            checked={type === 'Online'}
                        /> Online
                    </label>
                    <label>
                        <input
                            type='radio'
                            value='In person'
                            name='Type'
                            onChange={(e) => setType(e.target.value)}
                            checked={type === 'In person'}
                        /> In person
                    </label>
                </div>
                <button type='submit' disabled={validationErrors.length > 0}>Submit</button>
            </form>
                <button onClick={() => deleteGrouphandler(groupId)}>Delete Group</button>
        </div>
    );
}


export default EditGroupFormComponent
