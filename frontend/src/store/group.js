
const GET_GROUPS = 'groups/GET_GROUPS';

export const getAllGroups = (groups) => ({
    type: GET_GROUPS,
    groups
})


export const getGroups = () => async (dispatch) => {
    const response = await fetch('/api/groups');


    if (response.ok) {
        const groups = await response.json();
        dispatch(getAllGroups(groups))
        return groups
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
        default:
            return state
    }
}

export default groupReducer;
