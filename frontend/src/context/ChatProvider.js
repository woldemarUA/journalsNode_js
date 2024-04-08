import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import { io } from 'socket.io-client';

const WS_PATH = process.env.REACT_APP_WS_URL;

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(WS_PATH, { path: '/socket.io' });

    socketRef.current.on('connect', () => {
      console.log('Connected to server');

      // Emit the 'greeting' event to the server
    });

    // Listen for the 'responseGreeting' event from the server
    socketRef.current.on('responseGreeting', (message) => {
      //   console.log('Received from server:', message);
      //   setMessages((prevMessages) => [...prevMessages, ...message]); FOR CHAT WITH REAL USERS MAY BE NEED TO USE THIS (preserves the history)
      setMessages([...message]);
    });

    // Cleanup on component unmount
    return () => {
      socketRef.current.close();
    };
  }, []);

  const sendMessage = (message) => {
    console.log('sending message', message);
    socketRef.current.emit('greeting', { message });
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
