import {useState} from "react";
import {useNavigate} from "react-router-dom"

import axios from 'axios'
const Login=()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();
const handleLogin = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.post('http://localhost:5000/api/users/login', {
    email,
    password,
    });
    localStorage.setItem('token', response.data.token);
    navigate('/'); // Navigate to the home/dashboard page after login
    } catch (err) {
    setError(err.response?.data?.message || 'Something went wrong');
    }
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
        className="bg-white p-6 rounded shadow-md w-80"
        onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <label className="block mb-2">Email:</label>
        <input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
className="w-full p-2 border rounded mb-4"
required
/>
<label className="block mb-2">Password:</label>
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
className="w-full p-2 border rounded mb-4"
required
/>
<button
type="submit"
className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
>
Login
</button>
</form>
</div>
);
};

export default Login;

