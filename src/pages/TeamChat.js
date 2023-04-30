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
    onSnapshot,
    addDoc,
    Timestamp,
    orderBy,
    getDoc, // 수정된 부분
    doc, // 수정된 부분
} from 'firebase/firestore';

const Home = () => {
    const [chat, setChat] = useState('단톡방');
    const [text, setText] = useState('');
    const [msgs, setMsgs] = useState([]);
    const user1 = auth.currentUser.uid;
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const msgRef = collection(db, 'messages');
        const q = query(msgRef, orderBy('createdAt', 'asc'));
        onSnapshot(q, (querySnapshot) => {
            let msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push(doc.data());
            });
            setMsgs(msgs);
        });
    }, []);

    useEffect(() => {
        const userRef = doc(db, 'users', user1);
        getDoc(userRef).then((doc) => {
            if (doc.exists()) {
                const user = doc.data();
                setUserName(user.name);
            }
        });
    }, [user1]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text.trim() === '') return;
        await addDoc(collection(db, 'messages'), {
            text,
            from: user1,
            createdAt: Timestamp.fromDate(new Date()),
            name: userName,
        });
        setText('');
    };

    return (
        <Grid container sx={{ height: '65vh' }}>
            <Grid
                item
                xs={3}
                sx={{
                    borderRight: '2px solid #ffcc99',
                }}
            >
                <Typography
                    variant='body1'
                    textAlign='center'
                    sx={{ my: 3.5 }}
                >
                    조원 단체 채팅
                </Typography>
                <Divider></Divider>
            </Grid>
            <Grid item xs>
                <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ bgcolor: '#f8f9fa', pt: 4 }}>
                        <Typography style={{ fontSize: '20px' }}>조원 단체 채팅 중입니다.</Typography>
                        <MessageForm
                            handleSubmit={handleSubmit}
                            msgs={msgs}
                            setText={setText}
                            text={text}
                            user1={user1}
                        />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Home;
