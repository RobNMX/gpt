import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const ChatSelection = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);

  // WebSocket connection setup
  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:8080');
    
    ws.onopen = () => {
      console.log('WebSocket Connected');
      setLoading(false);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleWebSocketMessage(data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('Failed to connect to chat server');
      setLoading(false);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setError('Connection lost. Trying to reconnect...');
    };

    setSocket(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // Handle incoming WebSocket messages
  const handleWebSocketMessage = useCallback((data) => {
    switch (data.type) {
      case 'CHAT_LIST':
        setChats(data.chats);
        break;
      case 'NEW_CHAT':
        setChats(prevChats => [...prevChats, data.chat]);
        break;
      case 'CHAT_UPDATED':
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.id === data.chat.id ? data.chat : chat
          )
        );
        break;
      default:
        console.warn('Unknown message type:', data.type);
    }
  }, []);

  // Handle chat selection
  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
    onSelectChat(chatId);
  };

  // Request chat list
  const requestChatList = useCallback(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'GET_CHATS' }));
    }
  }, [socket]);

  useEffect(() => {
    requestChatList();
  }, [requestChatList]);

  if (loading) {
    return <div className="chat-selection-loading">Loading chats...</div>;
  }

  if (error) {
    return (
      <div className="chat-selection-error">
        <p>{error}</p>
        <button onClick={requestChatList}>Retry</button>
      </div>
    );
  }

  return (
    <div className="chat-selection-container">
      <h2 className="chat-selection-title">Available Chats</h2>
      <div className="chat-list">
        {chats.length === 0 ? (
          <p className="no-chats">No active chats available</p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${selectedChatId === chat.id ? 'selected' : ''}`}
              onClick={() => handleChatSelect(chat.id)}
            >
              <div className="chat-item-header">
                <h3>{chat.title}</h3>
                {chat.unreadCount > 0 && (
                  <span className="unread-badge">{chat.unreadCount}</span>
                )}
              </div>
              <p className="chat-item-preview">{chat.lastMessage}</p>
              <span className="chat-item-timestamp">
                {new Date(chat.lastActivityAt).toLocaleTimeString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

ChatSelection.propTypes = {
  onSelectChat: PropTypes.func.isRequired
};

export default ChatSelection;