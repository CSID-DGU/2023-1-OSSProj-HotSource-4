import React, { useEffect, useState } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
    Grid,
    Box,
} from '@mui/material';
import MessageForm from '../components/MessageForm';
import { authService, dbService } from '../myFireBase';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState('');

    useEffect(() => {
        let users = [];
        dbService
            .collection('users')
            .where('uid', 'not-in', [authService.currentUser.uid])
            .get()
            .then((querySnapshot) =>
                querySnapshot.forEach((doc) => {
                    users.push(doc.data());
                    setUsers(users);
                })
            );
    }, []);

    const selectUser = (user) => {
        setChat(user);
    };

    return (
        <Grid container sx={{ mt: 3 }}>
            <Grid item xs={3}>
                <List sx={{ maxWidth: '200px' }}>
                    {users.map((user) => {
                        return (
                            <ListItem key={user.uid}>
                                <ListItemText
                                    primary={
                                        <>
                                            {user.email}
                                            <IconButton
                                                aria-label='chat'
                                                onClick={() => {
                                                    selectUser(user);
                                                }}
                                            >
                                                <ChatBubbleOutlineIcon />
                                            </IconButton>
                                        </>
                                    }
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Grid>
            <Grid item xs>
                <Box sx={{ textAlign: 'center' }}>
                    {chat ? (
                        <>
                            <Typography>
                                {chat.email}님과 대화 중입니다.
                            </Typography>
                            <MessageForm />
                        </>
                    ) : (
                        <Typography>대화할 상대를 클릭하세요.</Typography>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};

export default Home;
