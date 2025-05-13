// src/pages/EditDriver.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EditDriver = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get driver ID from route
    const [driver, setDriver] = useState(null);

    useEffect(() => {
        // Simulate fetch by filtering from dummy data or use API
        const existingDriver = {
            driverid: 'DRV001',
            firstName: 'John',
            lastName: 'Doe',
            contact: '9876543210',
            email: 'john@example.com',
        };

        // Replace with actual API call if needed
        if (id === 'DRV001') {
            setDriver(existingDriver);
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDriver((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log('Updated Driver:', driver);

        setTimeout(() => {
            alert('Driver details updated successfully!');
            navigate('/driver'); // Adjust route if your driver list is at /driverlist
        }, 500);
    };

    if (!driver) return <Typography>Loading...</Typography>;

    return (
        <Box p={3}>
            <Typography variant="h6" gutterBottom>Edit Driver - {id}</Typography>
            <TextField
                label="First Name"
                name="firstName"
                value={driver.firstName}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Last Name"
                name="lastName"
                value={driver.lastName}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Contact"
                name="contact"
                value={driver.contact}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email"
                name="email"
                value={driver.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>Save Changes</Button>
        </Box>
    );
};

export default EditDriver;
