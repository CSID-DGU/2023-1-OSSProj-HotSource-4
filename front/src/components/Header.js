import React from 'react';
import { Box, AppBar, Toolbar, Button, Typography } from '@mui/material';
import { authService } from 'myFireBase';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate();
    const logout = () => {
        authService.signOut();
        navigate('/');
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        MyChat
                    </Typography>

                    <Button onClick={logout} color='inherit'>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
