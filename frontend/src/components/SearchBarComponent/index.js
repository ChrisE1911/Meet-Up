import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SearchCardComponent from '../SearchCardComponent';
import { getSearchEvents } from '../../store/search';
import { getSearchGroups } from '../../store/search';
import { clearSearchAC } from '../../store/search';
//Double column dropdown. One side displays events
//One side displays groups. Render each group/event based on what's typed in input

function SearchBarComponent() {
    const dispatch = useDispatch()
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)
    const searchBoxRef = useRef(null)

    const results = useSelector(state => state.search.results)
    const resultsArr = Object.values(results)
    const [data, setData] = useState('')
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [])

    const handleClickOutside = (e) => {
        if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
            setIsOpen(false);
            setData('')
        }
    }

    const handleInput = (e) => {
        setData(e.target.value)
    }

    const clearState = () => {
        setData('');

        dispatch(clearSearchAC())
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const queryObj = {
            name: data
        }

        if (location.pathname.includes("events")) {
            dispatch(getSearchEvents(queryObj))
        } else {
            dispatch(getSearchGroups(queryObj))
        }
    }

    return (
        <>
            {sessionUser &&
                <div className='search-bar'>
                    <div className='search-inputs'>
                        <form onChange={handleSubmit}>
                            {location.pathname.includes("events") ? <input id='search-text' ref={searchBoxRef} type='text' value={data} onChange={handleInput} onClick={() => setIsOpen(!isOpen)} placeholder={'Search for Events'}></input> : <input id='search-text' ref={searchBoxRef} type='text' value={data} onClick={() => setIsOpen(!isOpen)} onChange={handleInput} placeholder={'Search for Groups'}></input>}
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
                        {isOpen && <div id='search-results' style={{ display: data ? 'block' : 'none' }}>
                            <ul>
                                {resultsArr.map((item) => {
                                    return <SearchCardComponent key={item.id} item={item} clear={clearState} />
                                })}
                            </ul>
                        </div>}
                    </div>
                </div>}
        </>
    )
}

export default SearchBarComponent
