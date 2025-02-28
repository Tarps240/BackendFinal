import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (token, userId) => {
        console.log('Login Route Hit');
        localStorage.setItem('token', token);
        setUser({ userId });
    };

    const logout = () => {
        console.log('Logout Route Hit');
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value = {{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};