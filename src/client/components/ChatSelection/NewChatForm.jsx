// src/client/components/ChatSelection/NewChatForm.jsx
import React, { useState } from 'react';

const NewChatForm = ({ onCreateChat }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTopicTitle.trim()) {
      onCreateChat(newTopicTitle);
      setNewTopicTitle('');
      setIsCreating(false);
    }
  };

  return (
    <div className="new-chat-section">
      {isCreating ? (
        <form onSubmit={handleSubmit} className="new-chat-form">
          <input
            type="text"
            value={newTopicTitle}
            onChange={(e) => setNewTopicTitle(e.target.value)}
            placeholder="Enter topic title"
            autoFocus
          />
          <button type="submit">Create</button>
          <button type="button" onClick={() => setIsCreating(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <button 
          className="new-chat-button"
          onClick={() => setIsCreating(true)}
        >
          New Chat
        </button>
      )}
    </div>
  );
};

export default NewChatForm;