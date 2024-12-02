import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import "./Display.css"

const socket = io("http://127.0.0.1:5000"); // Connect to Flask server

export default function Newdisplay() {
    const [notices, setNotices] = useState([]);
    const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

    useEffect(() => {
        // Fetch initial data
        fetch("http://127.0.0.1:5000/api/circulars")
            .then((response) => response.json())
            .then((data) => setNotices(JSON.parse(data.data)));

        // Listen for real-time updates
        socket.on("new_circular", (newCircular) => {
            setNotices((prevNotices) => [...prevNotices, newCircular]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentNoticeIndex((prevIndex) =>
                prevIndex === notices.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [notices]);

    return (
        <>
            <video autoPlay muted loop id="myVideo" >
                {
                    <source src="Background.mp4" type="video/mp4" />
                }
                {/* <source src="clearday1.mp4" type="video/mp4" /> */}
            </video>
            <div className="wrapper">
                <div className="context">
                    {notices.length > 0 ? (
                        <div className='contentBox'>
                            <h3>{notices[currentNoticeIndex].title}</h3>
                            <p>{notices[currentNoticeIndex].message}</p>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>
        </>
    );
}
