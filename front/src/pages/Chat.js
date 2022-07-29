import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dbService } from 'myFireBase';
import { TextField, Button, Box } from '@mui/material';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState([]);
    const { id } = useParams();
    const getMessages = async () => {
        const messages = await dbService
            .collection('messages')
            .doc(`${id}`)
            .get();
        if (messages.exists) {
            setChats(messages.data());
        } else {
            await dbService.collection('messages').doc(`${id}`).set({
                content: '대화가 시작되었습니다.',
            });
            const messages = await dbService
                .collection('messages')
                .doc(`${id}`)
                .get();
            setChats(messages.data());
        }
    };
    useEffect(() => {
        getMessages();
    }, []);

    return (
        <>
            <Box component='form'>
                <TextField
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
                <Button type='submit'>전송</Button>
            </Box>
        </>
    );
};

export default Chat;
