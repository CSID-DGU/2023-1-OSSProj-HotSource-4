import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from 'myFireBase';

const Login = () => {
    const navigate = useNavigate();

    // 상태관리
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
    const validateEmail = (email) => {
        return email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    // 비밀번호가 4글자 이상인지 여부를 확인함.
    const validatePassword = (password) => {
        return password.length >= 6;
    };

    //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
    const isEmailValid = validateEmail(email);
    //위 validateEmail 함수를 통해 패스워드 형태 적합 여부를 확인함.
    const isPasswordValid = validatePassword(password);
    // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
    const isFormValid = isEmailValid && isPasswordValid;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.signInWithEmailAndPassword(email, password);
            navigate('/');
        } catch (e) {
            alert('로그인에 실패하였습니다.');
        }
    };

    return (
        <Container>
            <Box
                sx={{ mx: 'auto', mt: 3, maxWidth: '500px' }}
                component='form'
                onSubmit={handleSubmit}
            >
                <Typography variant='h6' textAlign='center' fontWeight='bold'>
                    로그인
                </Typography>
                <TextField
                    autoComplete='off'
                    required
                    sx={{ mt: 5 }}
                    margin='dense'
                    label='Email'
                    type='email'
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {!isEmailValid && (
                    <Typography sx={{ color: 'gray' }}>
                        이메일 형식이 올바르지 않습니다.
                    </Typography>
                )}
                <TextField
                    autoComplete='off'
                    required
                    sx={{ mt: 2 }}
                    margin='dense'
                    label='Password'
                    type='password'
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {!isPasswordValid && (
                    <Typography sx={{ color: 'gray' }}>
                        비밀번호는 4글자 이상 입니다.
                    </Typography>
                )}
                <Box textAlign='center' sx={{ mt: 3 }}>
                    <Button fullWidth type='submit' disabled={!isFormValid}>
                        로그인
                    </Button>
                    <Button
                        fullWidth
                        onClick={() => {
                            navigate('/signup');
                        }}
                    >
                        계정 만들러 가기
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
