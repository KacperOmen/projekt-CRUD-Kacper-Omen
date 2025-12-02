import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full flex justify-between items-center border-b-2 p-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">
        Moja aplikacja TEST
      </h1>

      <div className="flex items-center">
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 text-white px-4 py-2 rounded mx-2 hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          className="bg-blue-500 text-white px-4 py-2 rounded mx-2 hover:bg-blue-600 transition-colors"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}
