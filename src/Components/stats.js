import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from 'axios';

let dt = new Date();
let utcDate = dt.toUTCString();

const Statistics = () => {
    let [lastDay, setLastDay] = useState();

    useEffect(()=>{
        axios.get('https://habitual-f64a5.firebaseio.com/history'+localStorage.getItem('userId')+'.json')
    }, [])
    
    return (
        <div className="stats">
            <div>It is currently {utcDate}</div>
        </div>
    )
}

export default Statistics;