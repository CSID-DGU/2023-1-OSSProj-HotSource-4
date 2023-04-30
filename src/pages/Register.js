import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../myFireBase';
import { setDoc, doc, Timestamp } from 'firebase/firestore';

const Register = () => {
    const navigate = useNavigate();

    // 상태관리
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const { name, email, password, confirmPassword } = data;

    //이메일이 test@test.com 형태인지 regex를 이용해 확인합니다.
    // const validateEmail = (email) => {
    //     return email
    //         .toLowerCase()
    //         .match(
    //             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //         );
    // };

    //위 validateEmail 함수를 통해 이메일 형태인지 확인합니다.
    // const isEmailValid = validateEmail(email);
    // 비밀번호가 6글자 이상인지 여부를 확인합니다.
    const isPasswordValid = password.length >= 6;
    // 비밀번호와 비밀번호확인이 일치하는지 여부를 확인합니다.
    const isPasswordSame = password === confirmPassword;

    // 위 4개 조건이 모두 동시에 만족되는지 확인합니다.
    // const isFormValid = isEmailValid && isPasswordValid && isPasswordSame;

    // Input 값이 변할 때마다 상태를 업데이트 합니다.
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // 회원가입 버튼 클릭 시 회원을 등록하고 DB에 저장합니다.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                `${email}@naver.com`,
                password
            );
            await setDoc(doc(db, 'users', result.user.uid), {
                uid: result.user.uid,
                name,
                email,
                createdAt: Timestamp.fromDate(new Date()),
            });

            setData({ name: '', email: '', password: '', confirmPassword: '' });
            navigate('/');
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
                    label='Name'
                    name='name'
                    type='text'
                    fullWidth
                    value={name}
                    onChange={handleChange}
                />
                <TextField
                    autoComplete='off'
                    required
                    margin='dense'
                    label='학번'
                    name='email'
                    // type='email'
                    fullWidth
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
                    label='password'
                    name='password'
                    type='Password'
                    fullWidth
                    value={password}
                    onChange={handleChange}
                />
                {!isPasswordValid && (
                    <Typography sx={{ color: 'gray' }}>
                        비밀번호는 6글자 이상 입니다.
                    </Typography>
                )}
                <TextField
                    autoComplete='off'
                    required
                    sx={{ mt: 2 }}
                    margin='dense'
                    name='confirmPassword'
                    label='ConfirmPassword'
                    type='Password'
                    fullWidth
                    value={confirmPassword}
                    onChange={handleChange}
                />
                {!isPasswordSame && (
                    <Typography sx={{ color: 'gray' }}>
                        비밀번호가 일치하지 않습니다.
                    </Typography>
                )}
                <Box textAlign='center' sx={{ mt: 3 }}>
                    <Button
                        fullWidth
                        // disabled={!isFormValid}
                        type='submit'
                        sx={{ mb: 1 }}
                        variant='outlined'
                    >
                        회원가입
                    </Button>
                    <Button
                        fullWidth
                        onClick={() => {
                            navigate('/login');
                        }}
                        variant='outlined'
                    >
                        이미 계정이 있습니다.
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
