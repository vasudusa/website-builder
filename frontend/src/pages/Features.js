// frontend/src/pages/Features.js
import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import DevicesIcon from '@mui/icons-material/Devices';
import SpeedIcon from '@mui/icons-material/Speed';

const featureList = [
    {
        title: 'Drag & Drop Editor',
        description: 'Easily design your website with an intuitive drag‑and‑drop interface.',
        icon: <BuildIcon fontSize="large" color="primary" />,
    },
    {
        title: 'Responsive Design',
        description: 'Your website looks great on all devices – desktops, tablets, and mobiles.',
        icon: <DevicesIcon fontSize="large" color="primary" />,
    },
    {
        title: 'High Performance',
        description: 'Optimized for speed and SEO to help your website rank higher.',
        icon: <SpeedIcon fontSize="large" color="primary" />,
    },
];

const Features = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 8 }}>
            <Typography variant="h3" gutterBottom align="center">
                Key Features
            </Typography>
            <Grid container spacing={4}>
                {featureList.map((feature, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                            {feature.icon}
                            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                {feature.title}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                {feature.description}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Features;
