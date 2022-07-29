import {
    Box,
    TextField,
    Button,
    Container,
    Typography,
    InputBase,
} from '@mui/material';
import React from 'react';

const MessageForm = () => {
    const handleSubmit = (e) => {};
    return (
        <Container>
            <Box
                sx={{
                    height: '75vh',
                    borderRadius: '10px',
                    border: 'black 1px solid',
                    overflowy: 'scroll',
                }}
            ></Box>
            <Box component='form' onSubmit={handleSubmit}>
                <Box
                    sx={{
                        border: '1px solid black',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <InputBase
                        sx={{ pl: 3 }}
                        type='text'
                        placeholder='메시지를 입력하세요'
                        fullWidth
                    />
                    <Button type='submit'>전송</Button>
                </Box>
            </Box>
        </Container>
    );
};

export default MessageForm;
