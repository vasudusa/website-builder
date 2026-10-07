import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [websites, setWebsites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // In production, filter by the logged-in user's ID
        axios.get('http://localhost:5000/api/websites')
            .then(res => setWebsites(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <Container sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom>My Websites</Typography>
            <List>
                {websites.map(site => (
                    <ListItem key={site._id} divider>
                        <ListItemText primary={site.title} />
                        <Button variant="outlined" onClick={() => navigate(`/editor/${site._id}`)}>Edit</Button>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Dashboard;
