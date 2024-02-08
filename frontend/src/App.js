import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link, BrowserRouter as Router, Switch, Route, Routes, useParams } from "react-router-dom";
import Navbar from './components/navbar/navbar.js';
import Signup from './components/signup/SingupForm.js';
import Login from './components/login/LoginForm.js';
import RoomList from './components/rooms/RoomList.js';
import ChatRoom from './components/rooms/ChatRoom.js';

function App() {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [socketId, setSocketId] = useState(null);
    const [currentRoom, setCurrentRoom] = useState(null); // State to store current room

    useEffect(() => {
        // Establish socket connection when the component mounts
        const newSocket = io('http://localhost:4040');
        newSocket.on('connect', () => {
            console.log('Connected to server');
            setSocketId(newSocket); // Set the socket object once connected
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
            setSocketId(null); // Clear the socket object on disconnection
        });

        // Clean up socket connection when the component unmounts
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <Router>
            <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
            <Routes>        
                {loggedInUser ? (
                    <>
                        <Route path="/rooms" element={<RoomList socket={socketId} setCurrentRoom={setCurrentRoom} />} />
                        <Route path="/chat/:roomId" element={<ChatRoom socket={socketId} room={currentRoom} loggedInUser={loggedInUser} />} />
                    </>
                ) : (
                    <>
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/login' element={<Login setLoggedInUser={setLoggedInUser} />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;