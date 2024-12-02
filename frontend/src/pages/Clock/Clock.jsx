import React, { useEffect, useState } from 'react';
import './Clock.css'
const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000); // Updates every second

        return () => clearInterval(timerId); // Cleanup when component unmounts
    }, []);

    return (
        <div className='clock-container'>
            {/* <h2>Current Time:</h2> */}
            {/* <h3 className='clocktxt'>{time.toLocaleTimeString()}</h3> */}
            <h3 className='clocktxt'>{time.toLocaleDateString()} <br /> {time.toLocaleTimeString()}</h3> {/* Displays both date and time */}
        </div>
    );
};

export default Clock;
