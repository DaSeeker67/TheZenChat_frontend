// src/App.jsx
import { useState, useRef, useEffect } from 'react';

const socket = new WebSocket('ws://localhost:9090');

export default function App() {
  const [page, setPage] = useState('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSignin = () => {
    if (username && password) {
      setPage('join');
    }
  };

  const handleJoinRoom = () => {
    socket.send(JSON.stringify({
      type: 'join',
      payload: { roomid: roomId },
    }));
    setPage('chat');
  };

  const handleSendMessage = () => {
    socket.send(JSON.stringify({
      type: 'message',
      payload: { roomid: roomId, message: `${username}: ${message}` },
    }));
    setMessage('');
  };

  const handleLeaveRoom = () => {
    socket.send(JSON.stringify({
      type: 'leave',
      payload: { roomid: roomId },
    }));
    setRoomId('');
    setMessages([]);
    setPage('join');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {page === 'signin' && (
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
          <h1 className="text-xl font-bold mb-4">Sign In</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />
          <button onClick={handleSignin} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            Sign In
          </button>
        </div>
      )}

      {page === 'join' && (
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
          <h1 className="text-xl font-bold mb-4">Join Room</h1>
          <input
            type="text"
            placeholder="Room Code"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />
          <button onClick={handleJoinRoom} className="bg-green-500 text-white px-4 py-2 rounded w-full">
            Join Room
          </button>
        </div>
      )}

      {page === 'chat' && (
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl flex flex-col h-[80vh]">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Room: {roomId}</h1>
            <button onClick={handleLeaveRoom} className="text-red-500">Leave</button>
          </div>
          <div className="flex-1 overflow-y-auto border p-2 rounded bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className="mb-1">{msg}</div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 border rounded mr-2"
            />
            <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
