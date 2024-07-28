import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const login = async (name, password) => {
        try {
            const response = await axios.post('http://localhost:5000/login', { name, password });
            localStorage.setItem('token', response.data.token);
            await fetchUser(response.data.token);
            navigate('/');
        } catch (error) {
            throw new Error('Login failed');
        }
    };

    const signup = async (email, password, confirmPassword, name, displayName) => {
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }
        try {
            const response = await axios.post('http://localhost:5000/signup', { email, password, confirmPassword, name, displayName });
            await login(name, password);
            navigate('/');
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Signup failed');
        }
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    const fetchUser = async (token) => {
        try {
            const response = await axios.get('http://localhost:5000/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data);
        } catch (error) {
            localStorage.removeItem('token');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUser(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, signup, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};