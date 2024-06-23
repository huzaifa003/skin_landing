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
    console.log("hello")
    if (newMessage.trim() !== '') {
      const messageRef = push(ref(db, `communities/${communityId}/chats`));
      set(messageRef, {
        username: username, // Replace with actual user authentication
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
  });

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      p: 3,
      height: '100%',
      overflowY: 'auto',
      backgroundColor: theme.palette.background.paper
    }}>
      {messages.map((msg, index) => (
        <Typography key={index} sx={messageBubbleStyle(msg.username)}>
          <strong>{msg.username}: </strong>{msg.message}
        </Typography>
      ))}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? handleSendMessage() : null}
          sx={{ mr: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>Send</Button>
      </Box>
    </Box>
  );
}

export default ChatBox;
