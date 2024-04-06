import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useArticles } from '../../context/ArticlesProvider';
import ArticlesList from '../Articles/ArticlesList';

const WS_PATH = process.env.REACT_APP_WS_URL;

export const Home = () => {
  const { articlesAPI, setPending } = useArticles();

  useEffect(() => {
    console.log(WS_PATH);
    const socket = io(WS_PATH, { path: '/socket.io' });
    socket.on('connect', () => {
      console.log('Connected to server');

      // Emit the 'greeting' event to the server
      socket.emit('greeting', { message: 'Hello this is works' });
    });

    // Listen for the 'responseGreeting' event from the server
    socket.on('responseGreeting', (message) => {
      console.log('Received from server:', message);
    });

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, []);
  useEffect(() => {
    setPending(false);
  }, [setPending]);

  return <ArticlesList articles={articlesAPI} />;
};
