import {Navigate, Route, Routes} from'react-router-dom';
import ClientsPage from "./pages/ClientsPage";
import HomePage from './pages/HomePage';
import {ToastContainer} from 'react-toastify';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';

function App() {
  const {user, loading} = useContext(AppContext)

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to="/clients" />} />
        <Route path='/register' element={!user ? <SignupPage /> : <Navigate to="/clients" />} />
        <Route path='/clients' element={user ? <ClientsPage /> : <Navigate to="/" />} />       
      </Routes>
    </div>
  );
}

export default App;