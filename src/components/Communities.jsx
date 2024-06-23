import React, { useState, useEffect } from 'react';
import { Container, Grid, List, ListItem, ListItemText, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Paper } from '@mui/material';
import { db } from '../DB/firebase';
import { ref, onValue, push, set } from 'firebase/database';
import ChatBox from './ChatBox'; // Ensure this is correctly imported from its file location

function CommunitiesChat() {
    const [communities, setCommunities] = useState([]);
    const [activeCommunityId, setActiveCommunityId] = useState(null);
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
    };

    const handleAddCommunity = () => {
        if (!newCommunityName.trim() || !newCommunityDesc.trim()) return;

        const newCommunity = {
            name: newCommunityName,
            description: newCommunityDesc
        };
        const newCommunityRef = push(ref(db, 'communities'));
        set(newCommunityRef, newCommunity).then(() => {
            handleCloseDialog();
            setNewCommunityName('');
            setNewCommunityDesc('');
        });
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Button variant="contained" color="primary" onClick={handleOpenDialog} sx={{ my: 2 }}>
                        Add Community
                    </Button>
                    <List component="nav">
                        {communities.map(community => (
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
                <Grid item xs={8}>
                    {activeCommunityId ? (
                        <Paper sx={{ overflow: 'scroll'}}>
                            <ChatBox communityId={activeCommunityId} />
                        </Paper>
                    ) : (
                        <Typography variant="h5" sx={{ mt: 2, textAlign: 'center' }}>
                            Select a community to view the chat
                        </Typography>
                    )}
                </Grid>
            </Grid>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add New Community</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="community-name"
                        label="Community Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newCommunityName}
                        onChange={(e) => setNewCommunityName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        id="community-description"
                        label="Community Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
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
