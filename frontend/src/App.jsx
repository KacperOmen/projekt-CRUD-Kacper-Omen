import {Route, Routes} from'react-router-dom';
import ClientsPage from "./pages/ClientsPage";
import HomePage from './pages/HomePage';
import {ToastContainer} from 'react-toastify';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<SignupPage />} />
        
        <Route 
          path='/clients' 
          element={<ClientsPage />} 
        />
      </Routes>
    </div>
  );
}

export default App;