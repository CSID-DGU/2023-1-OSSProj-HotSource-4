import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from 'myFireBase';

const Register = () => {
    const navigate = useNavigate();

    // 상태관리
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
    const validateEmail = (email) => {
        return email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
    const isEmailValid = validateEmail(email);
    // 비밀번호가 4글자 이상인지 여부를 확인함.
    const isPasswordValid = password.length >= 6;
    // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
    const isPasswordSame = password === confirmPassword;

    // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
    const isFormValid = isEmailValid && isPasswordValid && isPasswordSame;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.createUserWithEmailAndPassword(email, password);
            navigate('/signin');
        } catch (e) {
            alert('회원가입에 실패하였습니다.');
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
                    회원가입
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
                <TextField
                    autoComplete='off'
                    required
                    sx={{ mt: 2 }}
                    margin='dense'
                    label='password'
                    type='Password'
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    autoComplete='off'
                    required
                    sx={{ mt: 2 }}
                    margin='dense'
                    label='ConfirmPassword'
                    type='Password'
                    fullWidth
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Box textAlign='center' sx={{ mt: 3 }}>
                    <Button
                        fullWidth
                        size='large'
                        disabled={!isFormValid}
                        type='submit'
                        sx={{ mt: 3 }}
                    >
                        회원가입
                    </Button>
                    <Button
                        fullWidth
                        onClick={() => {
                            navigate('/signin');
                        }}
                    >
                        이미 계정이 있습니다.
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
