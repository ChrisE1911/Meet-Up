import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SearchCardComponent from '../SearchCardComponent';
import { getSearchEvents } from '../../store/search';
import { clearSearchAC } from '../../store/search';


function SearchBarComponent() {
    const dispatch = useDispatch()
    const results = useSelector(state => state.search.results)
    const resultsArr = Object.values(results)
    const [data, setData] = useState('')
    const [type, setType] = useState('')
    const sessionUser = useSelector(state => state.session.user)

    console.log(results)


    const handleInput = (e) => {
        setData(e.target.value)
    }

    const clearState = () => {
        setData('');
        setType('')

        dispatch(clearSearchAC())
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const queryObj = {
            name: data,
            type
        }

        dispatch(getSearchEvents(queryObj))
    }

    return (
        <>
            {sessionUser &&
                <div className='search-bar'>
                    <div className='search-inputs'>
                        <form onChange={handleSubmit}>
                            <input id='search-text' type='text' value={data} onChange={handleInput} placeholder='Search for Events'></input>
                            {/* <input
                                type='radio'
                                value='Online'
                                name='Type_Online'
                                onChange={(e) => setType(e.target.value)}
                                checked={type === 'Online'} />
                            <input
                                type='radio'
                                value='In-Person'
                                name='Type_In-Person'
                                onChange={(e) => setType(e.target.value)}
                                checked={type === 'In-Person'} /> */}
                        <button id='search-icon'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                        </form>
                        <div id='search-results' style={{display: type || data ? 'block' : 'none'}}>
                            <ul id=''>
                            {resultsArr.map((item) => {
                                return <SearchCardComponent key={item.id} item={item} clear={clearState} />
                            })}
                            </ul>
                    </div>
                    </div>
                </div>}
        </>
    )
}

export default SearchBarComponent
