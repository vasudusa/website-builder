import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', form);
            alert("Signup successful! Please login.");
            navigate('/login');
        } catch (err) {
            setError(err.response.data.error || "Signup failed");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>Signup</Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit}>
                <TextField fullWidth label="Name" name="name" margin="normal" onChange={handleChange} required />
                <TextField fullWidth label="Email" name="email" type="email" margin="normal" onChange={handleChange} required />
                <TextField fullWidth label="Password" name="password" type="password" margin="normal" onChange={handleChange} required />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Signup</Button>
            </Box>
        </Container>
    );
};

export default Signup;
