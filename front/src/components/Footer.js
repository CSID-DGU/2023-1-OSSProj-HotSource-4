import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';

export default function SimpleBottomNavigation() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    return (
        <Box
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
            elevation={3}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction
                    onClick={() => {
                        navigate('/');
                    }}
                    label='MyFreinds'
                    icon={<FavoriteIcon />}
                />
                <BottomNavigationAction
                    onClick={() => {
                        navigate('/chat');
                    }}
                    label='Chat'
                    icon={<ChatBubbleIcon />}
                />
                <BottomNavigationAction
                    onClick={() => {
                        navigate('/profile');
                    }}
                    label='Profile'
                    icon={<PersonIcon />}
                />
            </BottomNavigation>
        </Box>
    );
}
