import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SignUp = () => {
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'customer',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        };
        const handleSignUp = async (e) => {
        e.preventDefault();
        try {
        await axios.post('http://localhost:5000/api/users/register', formData);
        navigate('/login'); // Navigate to login page after successful sign-up
        } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
        }
        };
        return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
className="bg-white p-6 rounded shadow-md w-80"
onSubmit={handleSignUp}
>
<h2 className="text-xl font-bold mb-4">Sign Up</h2>
{error && <p className="text-red-500 text-sm mb-3">{error}</p>}
<label className="block mb-2">Name:</label>
<input
type="text"
name="name"
value={formData.name}
onChange={handleChange}
className="w-full p-2 border rounded mb-4"
required
/>
<label className="block mb-2">Email:</label>
<input
type="email"
name="email"
value={formData.email}
onChange={handleChange}
className="w-full p-2 border rounded mb-4"
required 
/>
<label className="block mb-2">Password:</label>
<input
type="password"
name="password"
value={formData.password}
onChange={handleChange}
className="w-full p-2 border rounded mb-4"
required
/>
<label className="block mb-2">Phone:</label>
<input
type="text"
name="phone"
value={formData.phone}
onChange={handleChange}
className="w-full p-2 border rounded mb-4"
required
/>
<label className="block mb-2">Role:</label>
<select
name="role"
value={formData.role}
onChange={handleChange}
className="w-full p-2 border rounded mb-4"
>
<option value="customer">Customer</option>
<option value="admin">Admin</option>
<option value="manager">Manager</option>
<option value="chef">Chef</option>
<option value="waiter">Waiter</option>
<option value="cashier">Cashier</option>
<option value="supplier">Supplier</option>
</select>
<button
type="submit"
className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
>
Sign Up
</button>
</form>
</div>
);
};
export default SignUp;  