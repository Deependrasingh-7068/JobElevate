import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const showNotification = (text) => {
    setMessage(text);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {visible && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          backgroundColor: '#4caf50',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.2)'
        }}>
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};
