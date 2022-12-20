import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAEvent } from '../../store/event.js';
import { useParams } from 'react-router-dom';


function CreateEventFormComponent() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [capacity, setCapacity] = useState('');
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [validationErrors, setValidationErrors] = useState([])
    const [previewImage, setPreviewImage] = useState('')
    const dispatch = useDispatch();
    const history = useHistory()
    const { groupId } = useParams();



    useEffect(() => {
        const errors = [];

        if (name.length < 5) {
            errors.push( "Name must be at least 5 characters")
        }

        if (type !== 'Online' && type !== 'In Person') {
            errors.push("Type must be 'Online' or 'In person'")
        }

        if (!Number(capacity)) {
            errors.push("Capacity must be a number")
        }

        if (description.length === 0) {
            errors.push('Description is required')
        }

        setValidationErrors(errors)
    }, [name, type, capacity, description, startDate])


    const handleSubmit = (e) => {
        e.preventDefault();
        const event = {
            name,
            type,
            capacity,
            price,
            description,
            startDate,
            endDate
        }

        const image = {
            url: previewImage,
            "preview": true
        }

        return dispatch(createAEvent(groupId, event, image))
            .then(() => history.push('/events')).catch(
                async (res) => {
                  const data = await res.json();
                  if (data && data.errors) setValidationErrors((prev) => [...prev, data.errors]);
                }
              );

    };

    return (
        <div>
            <h1>Create Event</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {validationErrors.length > 0 && validationErrors.map((error, idx) => (
                        <ul>
                            <li key={idx}>{error}</li>
                        </ul>
                    ))}
                </ul>
                <input
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder='Name of Event'
                    name='Capacity'
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
                        /> In Person
                    </label>
                </div>
                <input
                    type='number'
                    onChange={(e) => setCapacity(e.target.value)}
                    value={capacity}
                    placeholder='Expected # of Attendees'
                    name='Capacity'
                    min={0}
                    required
                />
                <input
                    type='number'
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    placeholder='Price'
                    name='Price'
                    min={0}
                    required
                />
                <input
                    type='text'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder='Description'
                    name='Description'
                    required
                />
                <div>
                    <input
                        type='datetime-local'
                        onChange={(e) => setStartDate(e.target.value)}
                        value={startDate}
                        placeholder='StartDate'
                        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                        name='StartDate'
                        required
                    />
                    <input
                        type='datetime-local'
                        onChange={(e) => setEndDate(e.target.value)}
                        value={endDate}
                        placeholder='EndDate'
                        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                        name='EndDate'
                        required
                    />
                </div>
                <input
                    type='text'
                    onChange={(e) => setPreviewImage(e.target.value)}
                    value={previewImage}
                    placeholder='Image'
                    name='Image'
                    required
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default CreateEventFormComponent
