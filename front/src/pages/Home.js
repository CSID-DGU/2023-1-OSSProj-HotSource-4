import React, { useEffect, useState } from 'react';
import { db, auth } from '../myFireBase';
import {
    List,
    Divider,
    ListItemButton,
    ListItemText,
    Typography,
    Grid,
    Box,
} from '@mui/material';
import MessageForm from '../components/MessageForm';
import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    Timestamp,
    orderBy,
} from 'firebase/firestore';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState('');
    const [text, setText] = useState('');
    const [msgs, setMsgs] = useState([]);
    const user1 = auth.currentUser.uid;

    useEffect(() => {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', 'not-in', [user1]));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            setUsers(users);
        });
    }, []);

    const selectUser = (user) => {
        setChat(user);
        const user2 = user.uid;
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

        const msgRef = collection(db, 'messages', id, 'chat');
        const q = query(msgRef, orderBy('createdAt', 'asc'));
        onSnapshot(q, (querySnapshot) => {
            let msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push(doc.data());
            });
            setMsgs(msgs);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user2 = chat.uid;
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
        await addDoc(collection(db, 'messages', id, 'chat'), {
            text,
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
        });
        setText('');
    };

    return (
        <Grid container sx={{ height: 'calc(100vh - 64px)' }}>
            <Grid
                item
                xs={3}
                sx={{
                    borderRight: '2px solid #272727',
                }}
            >
                <List>
                    <Typography
                        variant='body1'
                        textAlign='center'
                        sx={{ my: 3 }}
                    >
                        친구 목록
                    </Typography>
                    <Divider />
                    {users.map((user) => {
                        return (
                            <>
                                <ListItemButton
                                    key={user.uid}
                                    onClick={() => selectUser(user)}
                                >
                                    <ListItemText
                                        sx={{ textAlign: 'center' }}
                                        primary={user.name}
                                    />
                                </ListItemButton>
                                <Divider />
                            </>
                        );
                    })}
                </List>
            </Grid>
            <Grid item xs>
                <Box sx={{ textAlign: 'center' }}>
                    {chat ? (
                        <>
                            <Typography sx={{ mt: 4 }}>
                                {chat.name}님과 대화 중입니다.
                            </Typography>
                            <MessageForm
                                handleSubmit={handleSubmit}
                                msgs={msgs}
                                text={text}
                                setText={setText}
                            />
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