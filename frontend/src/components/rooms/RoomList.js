import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function RoomList({ socket }) {
  const rooms = ["Leafs", "Canadiens", "Senators", "Jets", "Conucks"];
  const navigate = useNavigate();

  const handleJoinRoom = (roomId) => {
    if (socket && typeof socket.emit === "function") {
        socket.emit("joinRoom", { socketId: socket.id, room: roomId }); // Pass the room ID
        navigate(`/chat/${roomId}`);
    } else {
        console.error("Socket is not properly initialized");
    }
};


  return (
    <div className="room-list">
      <h2>Room List</h2>
      <ul>
        {rooms.map((room) => (
          <li id={room}>
            {room}
            <button onClick={() => handleJoinRoom(room)}> {`Join`}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}