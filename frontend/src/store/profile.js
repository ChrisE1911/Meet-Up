import { csrfFetch } from "./csrf";

const ADD_IMAGE = 'profile/ADD_IMAGE';
const GET_IMAGE = 'profile/GET_IMAGE';
const EDIT_PROFILE = 'profile/EDIT_PROFILE';

export const addImageActionCreator = (image) => ({
    type: ADD_IMAGE,
    payload: image
})

export const editProfileActionCreator = (data) => ({
    type: EDIT_PROFILE,
    payload: data
})


//CREATE/ADD IMAGE

export const addImageThunk = (image) => async (dispatch) => {
    const response = await csrfFetch(`/api/profile/images`, {
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

export const editProfileThunk = (editedProfile) => async (dispatch) => {
    const response = await csrfFetch(`api/profile/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedProfile)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(editProfileActionCreator(data));
        return data
    }
}

const initialState = {
    userProfile: {},
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
        case EDIT_PROFILE:
            newState = { ...state };
            const updatedProfile = action.payload
            newState.userProfile = updatedProfile;
            return newState;
        default:
            return state
    }
};

export default profileImageReducer
