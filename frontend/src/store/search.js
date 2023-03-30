import { csrfFetch } from "./csrf";

export const SET_SEARCH_QUERY = 'search/SET_SEARCH_QUERY';
export const SET_SEARCH_RESULTS = 'search/SET_SEARCH_RESULTS';
export const CLEAR_SEARCH_RESULTS = 'search/CLEAR_SEARCH_RESULTS'

export const setSearchQueryAC = (query) => {
    return {
        type: SET_SEARCH_QUERY,
        payload: query
    }
};

export const setSearchResultsAC = (results) => {
    return {
        type: SET_SEARCH_RESULTS,
        payload: results
    }
};

export const clearSearchAC = () => {
    return {
        type: CLEAR_SEARCH_RESULTS,
    }
};

export const getSearchEvents = (query) => async (dispatch) => {

    dispatch(setSearchQueryAC(query));

    const response = await csrfFetch(`/api/events?name=${query.name}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(setSearchResultsAC(data.Events))
        return data
    }
}

export const getSearchGroups = (query) => async (dispatch) => {

    dispatch(setSearchQueryAC(query));

    const response = await csrfFetch(`/api/groups?name=${query.name}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(setSearchResultsAC(data.Groups))
        return data
    }
}



const initialState = {
    query: {},
    results: {}
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_QUERY:
            return {
                ...state, query: action.payload
            };
        case SET_SEARCH_RESULTS:
            return {
                ...state, results: action.payload
            }
        case CLEAR_SEARCH_RESULTS:
            return initialState
        default:
            return state
    }
}

export default searchReducer
