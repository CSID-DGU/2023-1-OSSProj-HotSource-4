import React, { useContext } from 'react';
import { Box, AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../myFireBase';
import { AuthContext } from '../context/auth';

const Header = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        await authService.signOut();
        navigate('/login');
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
                    {user ? (
                        <>
                            <Button color='inherit' onClick={logout}>
                                로그아웃
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                color='inherit'
                                onClick={() => {
                                    navigate('/login');
                                }}
                            >
                                로그인
                            </Button>
                            <Button
                                color='inherit'
                                onClick={() => {
                                    navigate('/register');
                                }}
                            >
                                회원가입
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
