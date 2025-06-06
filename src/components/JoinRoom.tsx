import { useState } from "react";

interface Props {
  onJoin: (roomId: string) => void;
}

export default function JoinRoom({ onJoin }: Props) {
  const [roomId, setRoomId] = useState("");

  const handleJoin = () => {
    if (roomId.trim()) {
      onJoin(roomId);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
      <h1 className="text-xl font-bold mb-4">Join Room</h1>
      <input
        type="text"
        placeholder="Room Code"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        onClick={handleJoin}
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
      >
        Join Room
      </button>
    </div>
  );
}
