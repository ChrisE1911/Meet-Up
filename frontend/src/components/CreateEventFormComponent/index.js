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
            errors.push("Name must be at least 5 characters")
        }

        if (type !== 'Online' && type !== 'In Person') {
            errors.push("Type must be 'Online' or 'In person'")
        }

        if (price <= 5) {
            errors.push('Price is less than $5. Please choose an amount greater than 5')
        }

        if (!Number(capacity)) {
            errors.push("Capacity must be a number")
        }

        if (new Date((startDate)) <= new Date(Date.now())) {
            errors.push('Start Date must be future date'
            )
        }

        if (new Date(startDate) > new Date(endDate)) {
            errors.push('End date must be after Start Date')
        }

        if (description.length === 0) {
            errors.push('Description is required')
        }

        setValidationErrors(errors)
    }, [name, type, price, capacity, description, startDate, endDate])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const event = {
            name,
            type,
            capacity,
            price,
            description,
            startDate: new Date(startDate).toUTCString(),
            endDate: new Date(endDate).toUTCString()
        }

        const image = {
            url: previewImage,
            "preview": true
        }

        const newEventDispatch = await dispatch(createAEvent(groupId, event, image));

        // const newObj = await newEventDispatch

        console.log(newEventDispatch.id)

        history.push(`/events/${newEventDispatch.id}`)

            // .then(() => history.push('/events')).catch(
            //     async (res) => {
            //         const data = await res.json();
            //         if (data && data.errors) setValidationErrors((prev) => [...prev, data.errors]);
            //     }
            // );

    };

    return (
        <>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <form id='universal-form-container' onSubmit={handleSubmit}>
                <div id='form-container-div'>
                    <fieldset id='form-container-fieldset'>
                        <h1 id='form-title'>Create Event</h1>

                        <ul>
                            {validationErrors.length > 0 && validationErrors.map((error, idx) => (
                                <ul>
                                    <li key={idx}>{error}</li>
                                </ul>
                            ))}
                        </ul>
                        <input
                            id='input-field'
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
                            id='input-field'
                            type='number'
                            onChange={(e) => setCapacity(e.target.value)}
                            value={capacity}
                            placeholder='Expected # of Attendees'
                            name='Capacity'
                            min={0}
                            required
                        />
                        <input
                            id='input-field'
                            type='number'
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            placeholder='Price'
                            name='Price'
                            min={0}
                            required
                        />
                        <input
                            id='input-field'
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
                            id='input-field'
                            type='text'
                            onChange={(e) => setPreviewImage(e.target.value)}
                            value={previewImage}
                            placeholder='Image'
                            name='Image'
                            required
                        />
                        <button className='button-design' type='submit' disabled={validationErrors.length > 0}>Submit</button>
                        <button className='button-design' onClick={() => history.push('/events')}>Go back to Events</button>
                    </fieldset>
                </div>
            </form>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </>
    );
}

export default CreateEventFormComponent
