import { Box, Button, Container, InputBase, Typography } from '@mui/material';
import React from 'react';
import Moment from 'react-moment';

const MessageForm = ({ handleSubmit, text, setText, msgs }) => {
    return (
        <Container sx={{ py: 3 }}>
            <Box
                sx={{
                    height: '75vh',
                    overflowy: 'scroll',
                }}
            >
                {msgs.length &&
                    msgs.map((msg, i) => {
                        return (
                            <>
                                <Typography textAlign='left'>
                                    {msg.text}
                                </Typography>
                                <Typography
                                    textAlign='left'
                                    sx={{ fontSize: '2px' }}
                                >
                                    <Moment fromNow>
                                        {msg.createdAt.toDate()}
                                    </Moment>
                                </Typography>
                            </>
                        );
                    })}
            </Box>
            <Box component='form' onSubmit={handleSubmit}>
                <Box
                    sx={{
                        border: '1px solid #272727',
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
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                    />
                    <Button type='submit'>전송</Button>
                </Box>
            </Box>
        </Container>
    );
};

export default MessageForm;
