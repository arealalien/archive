import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (name, password) => {
        const response = await axios.post('http://localhost:3000/login', { name, password });
        localStorage.setItem('token', response.data.token);
        const userResponse = await axios.get('http://localhost:3000/profile', {
            headers: {
                Authorization: `Bearer ${response.data.token}`,
            },
        });
        setUser(userResponse.data);
    };

    const signup = async (email, password, confirmPassword, name) => {
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }
        try {
            const response = await axios.post('http://localhost:3000/signup', { email, password, name });
            const { token, error } = response.data;
            if (error) {
                throw new Error(error);
            }
            await login(name, password);
        } catch (error) {
            throw new Error('Signup failed');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:3000/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(response => {
                setUser(response.data);
            }).catch(() => {
                localStorage.removeItem('token');
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, signup }}>
            {children}
        </AuthContext.Provider>
    );
};