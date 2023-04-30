import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import AuthProvider from './context/auth';
import PrivateRoute from './components/PrivateRoute';
import Eclass from './pages/Eclass';
import TeamChat from './pages/TeamChat';

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
                    <Route
                        path='/Eclass'
                        element={
                            <PrivateRoute>
                                <Eclass />
                            </PrivateRoute>
                        }
                    />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/TeamChat' element={<TeamChat />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
