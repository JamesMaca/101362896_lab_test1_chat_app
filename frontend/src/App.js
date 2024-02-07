import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link, BrowserRouter as Router, Switch, Route, RouterProvider, Routes } from "react-router-dom";
import Navbar from './components/navbar/navbar.js';
import Signup from './components/signup/SingupForm.js';

function App() {
    const [socketId, setSocketId] = useState(null);

    useEffect(() => {
        // Establish socket connection when the component mounts
        const socket = io('http://localhost:4040');
        socket.on('connect', () => {
            console.log('Connected to server');
            setSocketId(socket.id); // Set the socket ID once connected
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
            setSocketId(null); // Clear the socket ID on disconnection
        });

        // Clean up socket connection when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                <Route path='/signup' element={<Signup />}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;