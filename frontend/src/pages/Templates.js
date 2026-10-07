import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import axios from 'axios';

const Templates = () => {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/templates')
            .then(res => setTemplates(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <Container sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom>Choose a Template</Typography>
            <Grid container spacing={4}>
                {templates.map(template => (
                    <Grid item xs={12} sm={6} md={4} key={template._id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={template.previewImage}
                                alt={template.name}
                            />
                            <CardContent>
                                <Typography variant="h6">{template.name}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => alert(`Template ${template.name} selected`)}>
                                    Select
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Templates;
