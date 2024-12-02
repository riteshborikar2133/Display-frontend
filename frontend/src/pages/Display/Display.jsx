import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from "socket.io-client";
import "./Display.css";
import Temperature from '../Temperature/Temperature';
import Clock from '../Clock/Clock';

export default function Display() {
    const [notices, setNotices] = useState([]);
    const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [temp, setTemp] = useState(12);
    const [loader, setLoader] = useState(null);
    const [animateClass, setAnimateClass] = useState("");

    useEffect(() => {
        setLoader(1);

        const fetchNotices = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/api/circulars");
                const data = JSON.parse(response.data.data);
                console.log(data);

                const sortedNotices = data.sort((a, b) => {
                    const importanceOrder = { High: 1, Moderate: 2, Low: 3, Lowest: 4 };
                    return importanceOrder[a.priority] - importanceOrder[b.priority];
                });
                setNotices(sortedNotices);
                setLoading(false);
                setLoader(null);
            } catch (error) {
                console.error("Error fetching notices:", error);
                setLoading(false);
            }
        };
        fetchNotices();

        const socket = io("http://127.0.0.1:5000");

        socket.on("new_circular", (newCircular) => {
            console.log("New Circular Received:", newCircular);
            setNotices((prevNotices) => {
                const updatedNotices = [...prevNotices, newCircular];
                return updatedNotices.sort((a, b) => {
                    const importanceOrder = { High: 1, Moderate: 2, Low: 3, Lowest: 4 };
                    return importanceOrder[a.priority] - importanceOrder[b.priority];
                });
            });
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            // Trigger animation
            setAnimateClass("animate");
            setTimeout(() => setAnimateClass(""), 500); // Remove the animation class after animation duration
            setCurrentNoticeIndex((prevIndex) =>
                prevIndex === notices.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [notices]);

    return (
        <>
            <video autoPlay muted loop id="myVideo">
                <source src="Background.mp4" type="video/mp4" />
            </video>
            <div className="wrapper">
                <div className="top-container">
                    <Clock />
                    <Temperature settemp={setTemp} />
                </div>
                {
                    loader ? (
                        <div className='logo-container'>
                            <img src="sbj.png" alt="" />
                        </div>
                    ) : (
                        <div className="context">
                            {loading ? (
                                <div>Loading...</div>
                            ) : notices.length > 0 ? (
                                <div className={`contentBox ${animateClass}`}>
                                    <h3>{notices[currentNoticeIndex].title}</h3>
                                    {notices[currentNoticeIndex].type === "text" ? (
                                        <p>{notices[currentNoticeIndex].message}</p>
                                    ) : (
                                        <img src={notices[currentNoticeIndex].message} alt="Notice" />
                                    )}
                                </div>
                            ) : (
                                <div>No notices available</div>
                            )}
                        </div>
                    )
                }
            </div>
        </>
    );
}
