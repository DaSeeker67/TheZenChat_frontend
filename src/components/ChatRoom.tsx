import { useEffect, useRef, useState } from "react";
import { getSocket } from "../services/socket";
import { useAuth } from "../context/AuthContext";

interface Props {
  roomId: string;
  onLeave: () => void;
}

export default function ChatRoom({ roomId, onLeave }: Props) {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const socket = getSocket();

    const handleMessage = (event: MessageEvent) => {
      setMessages((prev) => [...prev, event.data]);
    };

    socket?.addEventListener("message", handleMessage);

    // join room
    socket?.send(
      JSON.stringify({
        type: "join",
        payload: { roomid: roomId },
      })
    );

    return () => {
      // leave room on cleanup
      socket?.send(
        JSON.stringify({
          type: "leave",
          payload: { roomid: roomId },
        })
      );
      socket?.removeEventListener("message", handleMessage);
    };
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const socket = getSocket();
    if (message.trim()) {
      socket?.send(
        JSON.stringify({
          type: "message",
          payload: { roomid: roomId, message: `${user?.username}: ${message}` },
        })
      );
      setMessage("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl flex flex-col h-[80vh]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Room: {roomId}</h1>
        <button onClick={onLeave} className="text-red-500">
          Leave
        </button>
      </div>
      <div className="flex-1 overflow-y-auto border p-2 rounded bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className="mb-1">
            {msg}
          </div>
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
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
