import { createContext, useEffect, useState } from 'react';
import { authService } from '../myFireBase';
import Loading from '../components/Loading';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
