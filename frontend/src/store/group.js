import { csrfFetch } from "./csrf";

const GET_GROUPS = 'groups/GET_GROUPS';
const CREATE_GROUP = 'groups/CREATE_GROUP';
const GET_ONE_GROUP = 'groups/GET_ONE_GROUP'

export const getAllGroups = (groups) => ({
    type: GET_GROUPS,
    groups
})

export const createGroup = (group) => ({
    type: CREATE_GROUP,
    group
})

export const OneGroup = (group) => ({
    type: GET_ONE_GROUP,
    group
})

//GET ONE GROUP
export const getOneGroup = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`)

    console.log(response)

    if (response.ok) {
        const group = await response.json();
        dispatch(OneGroup(group))
        return group
    }
}

//GET ALL GROUPS
export const getGroups = () => async (dispatch) => {
    const response = await csrfFetch('/api/groups');


    if (response.ok) {
        const groups = await response.json();
        dispatch(getAllGroups(groups))
        return groups
    }
}

//CREATE A GROUP
export const createAGroup = (groupPayload, imagePayload) => async (dispatch) => {
    const response = await csrfFetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(groupPayload)
    })
    console.log(response)
    if (response.ok) {
        const group = await response.json();
        console.log('Group', group)
        const imageResponse = await csrfFetch(`/api/groups/${group.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imagePayload)
        })
        if (imageResponse.ok) {
            const images = imageResponse.json();
            const newObj = {
                ...images, ...group
            }
            dispatch(createGroup(newObj))
            return newObj
        }
    }
}


const initialState = {
    allGroups: {},
    singleGroup: {}
};
const groupReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_GROUPS:
            newState = { ...state };
            const newGroups = {};
            action.groups.Groups.forEach(group => {
                newGroups[group.id] = group
            });
            newState.allGroups = newGroups;
            return newState;
        case CREATE_GROUP:
            newState = { ...state };
            const updatedGroups = {...state.allGroups, [action.groups.Groups.id]: action.groups}
            newState.allGroups = updatedGroups;
            return newState;
        case GET_ONE_GROUP:
            return {
                ...state, singleGroup: action.group
            }
        default:
            return state
    }
}

export default groupReducer;
