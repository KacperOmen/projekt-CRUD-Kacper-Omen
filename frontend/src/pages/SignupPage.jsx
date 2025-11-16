import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

export default function Signup() {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");

    const { AUTH_API_URL } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {     
        try {
            e.preventDefault(); 
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(`${AUTH_API_URL}/register`, { login, email, password, role });
            
            if (data.success) {
                navigate('/login');
            } else {
                toast.error(data.message);
            }
        } catch (error) {         
            toast.error(error.response?.data?.message || "Błąd serwera");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="login" className="mb-1 font-semibold text-gray-700">Login</label>
                        <input
                            type="text"
                            id="login"
                            name="login"
                            placeholder="Enter login"
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="role" className="mb-1 font-semibold text-gray-700">Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                        Register
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">Already have an account?</p>
                <div className="flex justify-center mt-2">
                    <Link to='/login' className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
