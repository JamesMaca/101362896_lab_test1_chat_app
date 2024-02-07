import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
      socket.on('chat message', (msg) => {
          setMessages([...messages, msg]);
      });
  }, [messages]);

  const sendMessage = () => {
      socket.emit('chat message', input);
      setInput('');
  };

  return (
    <div>
      <h1>Chat App</h1>
      <h2>COMP 3133 - Lab Test 2</h2>
          <ul>
              {messages.map((msg, index) => (
                  <li key={index}>{msg}</li>
              ))}
          </ul>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
