import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Header from './Header';
import AuthProvider from '../context/auth';
import PrivateRoute from './PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <CssBaseline />
            <Router>
                <Header />
                <Routes>
                    <Route
                        path='/'
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
