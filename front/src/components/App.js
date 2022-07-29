import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import Home from 'routes/Home';
import Login from 'routes/Login';
import Register from 'routes/Register';
import Chat from 'routes/Chat';
import { authService } from 'myFireBase';
import Header from 'components/Header';
import Footer from 'components/Footer';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
    }, []);

    return (
        <>
            <CssBaseline />
            <Router>
                {isLoggedIn && (
                    <>
                        <Header />
                        <Footer />
                    </>
                )}
                <Routes>
                    {isLoggedIn ? (
                        <>
                            <Route path='/' exact element={<Home />} />
                            <Route path='/chat' element={<Chat />} />
                        </>
                    ) : (
                        <Route path='/' exact element={<Login />} />
                    )}
                    <Route path='/register' element={<Register />} />
                    <Route path='*' element={<Home />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
