import React, { useState, useEffect } from 'react';
import { Container, Grid, List, ListItem, ListItemText, Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { db } from '../DB/firebase';
import { ref, onValue, push, set } from 'firebase/database';
import ModeContext from '../context/ModeContext';

function CommunitiesChat() {
  const [communities, setCommunities] = useState([]);
  const [activeCommunityId, setActiveCommunityId] = useState(null);
  const [chats, setChats] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newCommunityName, setNewCommunityName] = useState('');
  const [newCommunityDesc, setNewCommunityDesc] = useState('');

  useEffect(() => {
    const communitiesRef = ref(db, 'communities');
    onValue(communitiesRef, (snapshot) => {
      const data = snapshot.val();
      const formattedCommunities = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })) : [];
      setCommunities(formattedCommunities);
    });
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewCommunityName('');
    setNewCommunityDesc('');
  };

  const handleAddCommunity = () => {
    const newCommunity = { name: newCommunityName, description: newCommunityDesc };
    const communitiesRef = ref(db, 'communities');
    const newCommunityRef = push(communitiesRef);
    set(newCommunityRef, newCommunity);
    handleCloseDialog();
  };

  const { mode, setMode } = React.useContext(ModeContext); // [1
  console.log(mode)
  setMode('dark')

  return (
    <Container style={{width: '100%'}}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Button variant="contained" color="primary" onClick={handleOpenDialog} sx={{ margin: 2 }}>
            Add Community
          </Button>
          <List component="nav">
            {communities.map((community) => (
              <ListItem 
                button 
                key={community.id}
                selected={community.id === activeCommunityId}
                onClick={() => setActiveCommunityId(community.id)}
              >
                <ListItemText primary={community.name} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              {communities.find(community => community.id === activeCommunityId)?.name || 'Select a Community'}
            </Typography>
            {chats.map((chat, index) => (
              <Box key={index} sx={{ marginBottom: 1 }}>
                <Typography variant="body1">{chat.message}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create New Community</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Community Name"
            type="text"
            fullWidth
            variant="standard"
            value={newCommunityName}
            onChange={(e) => setNewCommunityName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="standard"
            value={newCommunityDesc}
            onChange={(e) => setNewCommunityDesc(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddCommunity} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CommunitiesChat;
