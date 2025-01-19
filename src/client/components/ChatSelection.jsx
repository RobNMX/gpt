// src/client/components/ChatSelection.jsx
import React, { useState, useEffect } from 'react';
import TopicList from './ChatSelection/TopicList';
import NewChatForm from './ChatSelection/NewChatForm';
import '../styles/styles.css';

const ChatSelection = () => {
  const [chatTopics, setChatTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Temporary mock data - replace with actual API call
    const mockTopics = [
      { id: 1, title: 'First Chat', lastUpdated: new Date(), messageCount: 5 },
      { id: 2, title: 'Second Chat', lastUpdated: new Date(), messageCount: 3 },
    ];
    setChatTopics(mockTopics);
    setLoading(false);
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
    return <div>Loading...</div>;
  }

  return (
    <div className="chat-selection-container">
      <NewChatForm onCreateChat={handleCreateChat} />
      <TopicList 
        topics={chatTopics} 
        onSelect={handleChatSelect}
      />
    </div>
  );
};

export default ChatSelection;