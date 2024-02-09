
import '../App.css'
import React, { useState } from 'react';

function Message({ message, onEdit }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(editedMessage);
    setIsEditing(false);
  };

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isEditing ? (
        <input
          type="text"
          value={editedMessage}
          onChange={(e) => setEditedMessage(e.target.value)}
        />
      ) : (
        message
      )}
      {isHovering && !isEditing && <button onClick={handleEdit}>Edit</button>}
      {isEditing && <button onClick={handleSave}>Save</button>}
    </div>
  );
}