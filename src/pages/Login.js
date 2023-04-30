import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../myFireBase';

const Login = () => {
    const navigate = useNavigate();

    // 상태관리
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = data;

    //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
    // const validateEmail = (email) => {
    //     return email
    //         .toLowerCase()
    //         .match(
    //             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //         );
    // };

    // 비밀번호가 6글자 이상인지 여부를 확인합니다.
    const validatePassword = (password) => {
        return password.length >= 6;
    };

    //위 validateEmail 함수를 통해 이메일 형태인지 확인합니다.
    // const isEmailValid = validateEmail(email);
    //위 validateEmail 함수를 통해 패스워드 형태인지 확인합니다.
    const isPasswordValid = validatePassword(password);
    // 이메일과 비밀번호 조건이 동시에 만족되는지 확인합니다.
    // const isFormValid = isEmailValid && isPasswordValid;

    // Input 값이 변할 때마다 상태를 업데이트 합니다.
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // 로그인 버튼 클릭 시 회원 정보를 확인하고 로그인 합니다.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, `${email}@naver.com`, password);
            setData({ email: '', password: '' });
            navigate('/Eclass');
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
                    label='학번'
                    // type='email'
                    fullWidth
                    name='email'
                    value={email}
                    onChange={handleChange}
                />
                {/* {!isEmailValid && (
                    <Typography sx={{ color: 'gray' }}>
                        이메일 형식이 올바르지 않습니다.
                    </Typography>
                )} */}
                <TextField
                    autoComplete='off'
                    required
                    sx={{ mt: 2 }}
                    margin='dense'
                    label='Password'
                    type='password'
                    name='password'
                    fullWidth
                    value={password}
                    onChange={handleChange}
                />
                {!isPasswordValid && (
                    <Typography sx={{ color: 'gray' }}>
                        비밀번호는 6글자 이상 입니다.
                    </Typography>
                )}
                <Box textAlign='center' sx={{ mt: 3 }}>
                    <Button
                        fullWidth
                        type='submit'
                        // disabled={!isFormValid}
                        variant='outlined'
                        sx={{ mb: 1, borderColor: '#FF9500', color: '#FF6A00'}}
                        
                    >
                        로그인
                    </Button>
                    <Button
                        fullWidth
                        onClick={() => {
                            navigate('/register');
                        }}
                        variant='outlined'
                        sx={{ borderColor: '#FF9500', color: '#FF6A00'}}
                    >
                        계정 만들러 가기
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
