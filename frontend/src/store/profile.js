import { csrfFetch } from "./csrf";

const ADD_IMAGE = 'profile/ADD_IMAGE';
const GET_IMAGE = 'profile/GET_IMAGE';

export const addImageActionCreator = (image) => ({
    type: ADD_IMAGE,
    payload: image
})


//CREATE/ADD IMAGE

export const addImageThunk = (image) => async (dispatch) => {
    const response = await csrfFetch(`/api/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(image)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addImageActionCreator(data))
        return data
    }
}


const initialState = {
    allPictures: {}
}

const profileImageReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_IMAGE:
            newState = { ...state };
            const updatedImages = { ...state.allImages, [action.image.id]: action.image }
            newState.allImages = updatedImages;
            return newState;
        case GET_IMAGE:
            newState = { ...state };
            const newImages = {};
            action.forEach(image => {
                newImages[image.id] = image
            });
            newState.allImages = newImages;
            return newState;
        default:
            return state
    }
};

export default profileImageReducer
