import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Box,
    Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AppBarHeader = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" sx={{ zIndex: 1201 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Left: Title */}
                <Typography variant="h6" noWrap>
                    Admin Dashboard
                </Typography>

                {/* Right: Profile Avatar */}
                <Box>
                    <Tooltip title="Profile">
                        <IconButton onClick={() => navigate('/profile')} sx={{ p: 0 }}>
                            <Avatar
                                alt="Profile"
                                src="https://i.pravatar.cc/150?img=5" // Replace with your user avatar URL
                            />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarHeader;
