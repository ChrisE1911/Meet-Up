import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SearchCardComponent from '../SearchCardComponent';
import { getEvents } from '../../store/event';


function SearchBarComponent() {
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const events = useSelector((state => state.events.allEvents))
    const eventsArr = Object.values(events)

    console.log(eventsArr)

    useEffect(() => {
        dispatch(getEvents()).then(() => setData(eventsArr)).then(console.log(data))
    }, [])

    const sessionUser = useSelector(state => state.session.user)


    if (!events) return null;
    return (
        <>
            {sessionUser && <div className='search-bar'>
                <div className='search-inputs'>
                    <input id='search-text' type='text' name='' placeholder='Search for Events'></input>
                    <div id='search-icon'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div className='data-results'>
                    {data.map((item) => {
                        return <SearchCardComponent key={item.id} item={item} />
                    })}
                    <div />
                </div>
            </div>}
        </>
    )
}

export default SearchBarComponent
