import { csrfFetch } from "./csrf";

const GET_EVENTS = 'events/GET_EVENTS';
const CREATE_EVENT = 'events/CREATE_EVENT';
const GET_ONE_EVENT = 'events/GET_ONE_EVENT';

export const getAllEvents = (events) => ({
    type: GET_EVENTS,
    events
})

export const createEvent = (event) => ({
    type: CREATE_EVENT,
    event
})

export const OneEvent = (event) => ({
    type: GET_ONE_EVENT,
    event
})

//GET ALL EVENTS
export const getEvents = () => async (dispatch) => {
    const response = await csrfFetch('/api/events');

    if (response.ok) {
        const events = await response.json();
        dispatch(getAllEvents(events))
        return events
    }
}

//GET ONE EVENT

export const getOneEvent = (eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`)

    console.log('LOOKK HERE', eventId)

    if (response.ok) {
        const event = await response.json();
        dispatch(OneEvent(event))
        return event
    }
}

//CREATE A EVENT
export const createAEvent = (groupId, eventPayload, imagePayload) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventPayload)
    })
    if (response.ok) {
        const event = await response.json();
        const imageResponse = await csrfFetch(`/api/events/${event.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imagePayload)
        })
        if (imageResponse.ok) {
            const images = await imageResponse.json();
            const newObj = {
                ...images, ...event
            }
            dispatch(createEvent(newObj))
            return newObj
        }
    }
}

const initialState = {
    allEvents: {},
    singleEvent: {}
}


const eventReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_EVENTS:
            newState = { ...state };
            const newEvents = {};
            action.events.Events.forEach(event => {
                newEvents[event.id] = event
            });
            newState.allEvents = newEvents
            return newState;
            case CREATE_EVENT:
                newState = { ...state };
                const updatedEvents = {...state.allEvents, [action.event.id]: action.event}
                newState.allEvents = updatedEvents;
                return newState;
        case GET_ONE_EVENT:
            console.log(action)
                return {
                    ...state, singleEvent: action.event
                }
        default:
            return state
    }
};

export default eventReducer
