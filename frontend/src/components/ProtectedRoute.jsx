import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useContext(AppContext);

    if (loading) return <div>Loading...</div>;

    if (!user) return <Navigate to="/login" />;

    return children;
}