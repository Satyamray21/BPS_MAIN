import React from 'react';
import {
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    Box,
    Avatar
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PeopleIcon from '@mui/icons-material/People';
import Graph from './Graph';

const cardData = [
    { title: 'Total Bookings', value: 1280, icon: <AssignmentTurnedInIcon /> },
    { title: 'Deliveries', value: 960, icon: <LocalShippingIcon /> },
    { title: 'Vehicles', value: 34, icon: <DirectionsCarIcon /> },
    { title: 'Drivers', value: 78, icon: <PeopleIcon /> },
];

const Dashboard = () => (
    <Box sx={{ p: 3 }}>
        {/* Top 4 Summary Cards */}
        <Grid container spacing={3} mb={3} justifyContent={'space-between'}>
            {cardData.map((card, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            gap: 2,
                            p: 2,
                            height: '100%',
                            boxShadow: 4,
                            backgroundColor: '#fff',
                            borderRadius: 3,
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.03)',
                                boxShadow: 6,
                            },
                        }}
                    >
                        <Avatar
                            sx={{
                                bgcolor: 'primary.main',
                                width: 56,
                                height: 56,
                            }}
                        >
                            {card.icon}
                        </Avatar>
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary">
                                {card.title}
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                                {card.value}
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>

        {/* Graph Section */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
                Performance Overview
            </Typography>
            <Graph />
        </Paper>
    </Box>
);

export default Dashboard;
