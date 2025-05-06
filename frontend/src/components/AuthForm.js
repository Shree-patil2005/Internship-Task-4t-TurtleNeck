import React, { useState } from 'react';
import axios from 'axios';

<h1> Welcome</h1>
export default function AuthForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? 'login' : 'register';
        try {
            const res = await axios.post(`http://localhost:5000/api/users/${endpoint}`, {
                username,
                password,
            });
            if (isLogin) {
                localStorage.setItem('token', res.data.token);
                alert('Login successful!');
            } else {
                alert('Registration successful!');
                setIsLogin(true);
            }
        } catch (err) {
            alert(err.response?.data?.error || 'Can not be Registeried');
        }
    };
     
    return (
        
        <div>
            
            <h2 id="d1">{isLogin ? 'LOGIN' : 'REGISTER'}</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Username" class="m1" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" class="m1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Not Registered? Register Now' : 'Already Register?'}
            </button>
        </div>
        
    );
}

