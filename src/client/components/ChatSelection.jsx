import React, { useState, useEffect } from 'react';
import TopicList from './ChatSelection/TopicList';
import NewChatForm from './ChatSelection/NewChatForm';
import '../styles/styles.css';

const ChatSelection = () => {
  const [chatTopics, setChatTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Temporary mock data - replace with actual API call later
    try {
      const mockTopics = [
        { 
          id: 1, 
          title: 'First Chat', 
          lastUpdated: new Date(), 
          messageCount: 5 
        },
        { 
          id: 2, 
          title: 'Second Chat', 
          lastUpdated: new Date(Date.now() - 3600000), // 1 hour ago
          messageCount: 3 
        },
        {
          id: 3,
          title: 'Third Chat',
          lastUpdated: new Date(Date.now() - 86400000), // 1 day ago
          messageCount: 10
        }
      ];
      
      setChatTopics(mockTopics);
      setLoading(false);
    } catch (err) {
      setError('Failed to load chat topics');
      setLoading(false);
    }
  }, []);

  const handleChatSelect = (topic) => {
    console.log('Selected topic:', topic);
    // Add your chat selection logic here
  };

  const handleCreateChat = (title) => {
    const newTopic = {
      id: chatTopics.length + 1,
      title,
      lastUpdated: new Date(),
      messageCount: 0,
    };
    setChatTopics([...chatTopics, newTopic]);
  };

  if (loading) {
    return (
      <div className="loading">
        Loading chat topics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        {error}
      </div>
    );
  }

  return (
    <div className="chat-selection-container">
      <h2>Chat Topics</h2>
      <NewChatForm onCreateChat={handleCreateChat} />
      <TopicList 
        topics={chatTopics} 
        onSelect={handleChatSelect}
      />
    </div>
  );
};

export default ChatSelection;