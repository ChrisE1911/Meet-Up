import { csrfFetch } from "./csrf";

const GET_EVENTS = 'groups/GET_EVENTS';

export const getAllEvents = (events) => ({
    type: GET_EVENTS,
    events
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
        default:
            return state
    }
};

export default eventReducer
