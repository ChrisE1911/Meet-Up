import { csrfFetch } from "./csrf";

const GET_GROUPS = 'groups/GET_GROUPS';
const CREATE_GROUP = 'groups/CREATE_GROUP';
const GET_CURRENT_GROUPS = 'groups/GET_CURRENT_GROUPS'
const GET_ONE_GROUP = 'groups/GET_ONE_GROUP';
const REMOVE_GROUP = 'groups/REMOVE_GROUP';

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

export const removeGroup = (groupId) => ({
    type: REMOVE_GROUP,
    groupId
})

export const currentUserGroupsAC = (data) => ({
    type: GET_CURRENT_GROUPS,
    payload: data
})


//GET CURRENT USER GROUPS

export const getCurrentUserGroups = () => async (dispatch) => {
    const response = await csrfFetch('/api/groups/current')

    console.log(response)

    if (response.ok) {
        const data = await response.json();
        dispatch(currentUserGroupsAC(data))
        return data
    }
}


//GET ONE GROUP
export const getOneGroup = (groupId) => async (dispatch) => {
    // console.log('GROUP ID', groupId)
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

//EDIT A GROUP

export const editOneGroup = (updatingGroup) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${updatingGroup.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatingGroup)
    })


    if (response.ok) {
        const group = await response.json();
        dispatch(createGroup(group));
        return group
    }
}

//DELETE A GROUP

export const deleteGroup = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeGroup(groupId))

    }
    return response
}

const initialState = {
    allGroups: {},
    singleGroup: {},
    currentUserGroups: {}
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
            newState.singleGroup = {};
            return newState;
        case CREATE_GROUP:
            newState = { ...state };
            const updatedGroups = {...state.allGroups, [action.group.id]: action.group}
            newState.allGroups = updatedGroups;
            return newState;
        case GET_ONE_GROUP:
            return {
                ...state, singleGroup: action.group
            }
        case REMOVE_GROUP:
            newState = { ...state };
            delete newState.allGroups[action.groupId];
            newState.singleGroup = {};
            return newState
        case GET_CURRENT_GROUPS:
            newState = { ...state };
            console.log('ACTION', action)
            const currentGroups = {}
            action.payload.Groups.forEach(group => {
                currentGroups[group.id] = group
            });
            newState.currentUserGroups = currentGroups
            return newState
        default:
            return state
    }
}

export default groupReducer;
