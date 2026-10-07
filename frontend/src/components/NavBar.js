import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <AppBar position="static" sx={{ mb: 2 }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    MyWebsiteBuilder
                </Typography>
                <Box>
                    <Button color="inherit" component={RouterLink} to="/">Home</Button>
                    <Button color="inherit" component={RouterLink} to="/templates">Templates</Button>
                    <Button color="inherit" component={RouterLink} to="/dashboard">Dashboard</Button>
                    <Button color="inherit" component={RouterLink} to="/signup">Signup</Button>
                    <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
