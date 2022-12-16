import { useState, } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAEvent } from '../../store/event.js';

function CreateEventFormComponent() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [capacity, setCapacity] = useState('');
    const[price, setPrice] = useState('')
    const [description, setDescription] = useState('');
    const [startDate, setEndDate] = useState('');
    const [endDate, setStartDate] = useState('');
    const [validationErrors, setValidationErrors] = useState([])
    const [previewImage, setPreviewImage] = useState('')
    const dispatch = useDispatch();
    const history = useHistory()

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

        return dispatch(createAEvent(event, image))
        .then(()=> history.push('/events'))
            .catch( async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setValidationErrors((prev) => [...prev, ...data.errors])
                }
            }
        )

    };

    return (
        <div>
            <h1>Create Event</h1>
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
                                placeholder='Name of Event'
                                name='Capacity'
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
                <input
                        type='text'
                        onChange={(e) => setCapacity(e.target.value)}
                        value={capacity}
                        placeholder='Expected # of Attendees'
                        name='Capacity'
                />
                <input
                    type='text'
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    placeholder='Price'
                    name='Price'
                />
                <input
                    type='text'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder='Description'
                    name='Description'
                />
                <input
                    type='date'
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                    placeholder='StartDate'
                    name='StartDate'
                />
                <input
                    type='date'
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                    placeholder='EndDate'
                    name='EndDate'
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

export default CreateEventFormComponent
