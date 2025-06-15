import { useEffect, useRef, useState } from "react";
import { Send, Users, LogOut, Smile, MoreHorizontal } from "lucide-react";
import { getSocket } from "../services/socket";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';

export default function ChatRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{text: string, timestamp: string}>>([]);
  const [onlineCount] = useState(Math.floor(Math.random() * 50) + 10);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const socket = getSocket();

    const handleMessage = (event: MessageEvent) => {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [...prev, { text: event.data, timestamp }]);
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
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      socket?.send(
        JSON.stringify({
          type: "message",
          payload: { 
            roomid: roomId, 
            message: `${user}: ${message}`,
            timestamp: timestamp 
          },
        })
      );
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (message.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const parseMessage = (msg: string) => {
    if (msg.includes(': ')) {
      const [username, ...messageParts] = msg.split(': ');
      return { username, message: messageParts.join(': ') };
    }
    return { username: 'System', message: msg };
  };

  const handleLeave = () => {
    navigate('/rooms');
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      {/* Flamboyant background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full opacity-40 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-200 to-indigo-300 rounded-full opacity-40 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-cyan-200 to-teal-300 rounded-full opacity-30 blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-xl border border-purple-200/50 rounded-t-3xl px-6 py-4 shadow-lg shadow-purple-100/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">#</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                  {roomId}
                </h1>
                <div className="flex items-center space-x-3 text-sm text-purple-600">
                  <div className="flex items-center space-x-1">
                    <Users size={14} className="text-indigo-500" />
                    <span className="font-medium">{onlineCount} online</span>
                  </div>
                  <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
                  <span className="text-indigo-600 font-medium">Active now</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleLeave}
              className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <LogOut size={16} />
              <span className="text-sm font-medium">Leave</span>
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 bg-white/70 backdrop-blur-xl border-x border-purple-200/50 overflow-hidden shadow-inner">
          <div className="h-full overflow-y-auto px-6 py-4 space-y-4">
            {messages.map((msg, i) => {
              const { username, message: messageText } = parseMessage(msg.text);
              const isOwnMessage = username === user;
              
              return (
                <div
                  key={i}
                  className={`flex items-start space-x-3 group animate-fadeIn ${
                    isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                  style={{
                    animation: `fadeInUp 0.3s ease-out ${i * 0.05}s both`
                  }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md ${
                    isOwnMessage 
                      ? 'bg-gradient-to-br from-pink-500 to-purple-600' 
                      : 'bg-gradient-to-br from-indigo-500 to-cyan-600'
                  }`}>
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <div className={`flex-1 max-w-sm ${isOwnMessage ? 'text-right' : ''}`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-xs font-semibold ${
                        isOwnMessage ? 'text-pink-600' : 'text-indigo-600'
                      }`}>
                        {username}
                      </span>
                      <span className="text-xs text-purple-400">
                        {msg.timestamp}
                      </span>
                    </div>
                    <div className={`inline-block px-4 py-2 rounded-2xl transition-all duration-200 hover:scale-105 ${
                      isOwnMessage
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-200'
                        : 'bg-gradient-to-r from-white to-purple-50 text-gray-800 border border-purple-200 shadow-lg shadow-purple-100'
                    }`}>
                      <p className="text-sm leading-relaxed">{messageText}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2 text-purple-600 text-sm px-3 animate-pulse">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-indigo-400 to-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="font-medium">Someone is typing...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white/90 backdrop-blur-xl border border-purple-200/50 rounded-b-3xl px-6 py-4 shadow-lg shadow-purple-100/50">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type something amazing..."
                className="w-full bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl px-4 py-3 text-gray-800 placeholder-purple-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 focus:shadow-lg focus:shadow-purple-200/50"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
              <div className="absolute right-3 top-3 flex items-center space-x-1">
                <div className="relative" ref={emojiPickerRef}>
                  <button 
                    className="p-1.5 hover:bg-purple-100 rounded-lg transition-all duration-200 hover:scale-110"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <Smile size={16} className="text-purple-500" />
                  </button>
                  {showEmojiPicker && (
                    <div className="absolute bottom-full right-0 mb-2 z-50 transform scale-90 sm:scale-100 origin-bottom-right">
                      <div className="w-[280px] sm:w-[300px] md:w-[350px]">
                        <EmojiPicker
                          onEmojiClick={onEmojiClick}
                          width="100%"
                          height={400}
                          theme={Theme.LIGHT}
                          style={{
                            width: '100%',
                            maxWidth: '350px',
                            minWidth: '280px'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <button className="p-1.5 hover:bg-purple-100 rounded-lg transition-all duration-200 hover:scale-110">
                  <MoreHorizontal size={16} className="text-purple-500" />
                </button>
              </div>
            </div>
            
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg shadow-purple-300/50 hover:shadow-xl hover:shadow-purple-400/50"
            >
              <Send size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating elements for depth */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full opacity-30 ${
              i % 3 === 0 ? 'bg-purple-400' : i % 3 === 1 ? 'bg-pink-400' : 'bg-indigo-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.3;
            }
            50% { 
              transform: translateY(-20px) rotate(180deg); 
              opacity: 0.6;
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeInUp 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}