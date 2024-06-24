import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import { auth, db } from '../DB/firebase';
import { set, ref, onValue, push, serverTimestamp } from 'firebase/database';

function ChatBox({ communityId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const theme = useTheme();
  const [username, setUsername] = useState(auth?.currentUser?.email?.split('@')[0] || 'dummy');

  useEffect(() => {
    if (communityId) {
      const messagesRef = ref(db, `communities/${communityId}/chats`);
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const loadedMessages = data ? Object.values(data) : [];
        setMessages(loadedMessages);
      });
    }
  }, [communityId]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const messageRef = push(ref(db, `communities/${communityId}/chats`));
      set(messageRef, {
        username: username,
        message: newMessage,
        timestamp: serverTimestamp(),
      });
      setNewMessage('');
    }
  };

  const messageBubbleStyle = (user) => ({
    maxWidth: '80%',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(1),
    color: 'white',
    backgroundColor: username === user ? theme.palette.primary.main : theme.palette.grey[700],
    textAlign: 'left',
    wordBreak: 'break-word',
    alignSelf: username === user ? 'flex-end' : 'flex-start',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
  });

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      p: 3,
      height: '100%',
      overflowY: 'auto',
      backgroundColor: theme.palette.background.paper,
      boxShadow: '0px 4px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        height: '500px',
        overflowY: 'scroll'
      }}>
        {messages.map((msg, index) => (
          <Typography key={index} sx={messageBubbleStyle(msg.username)}>
            <strong>{msg.username}: </strong>{msg.message}
          </Typography>
        ))}
      </div>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, boxShadow: 'inset 0px -3px 6px rgba(0,0,0,0.1)' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? handleSendMessage() : null}
          sx={{ mr: 1, borderRadius: '4px' }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} sx={{ boxShadow: '0px 2px 4px rgba(0,0,0,0.2)' }}>Send</Button>
      </Box>
    </Box>
  );
}

export default ChatBox;
