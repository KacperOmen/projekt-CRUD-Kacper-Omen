import {Route, Routes} from'react-router-dom';
import ClientsPage from "./pages/ClientsPage";
import HomePage from './pages/HomePage';
import {ToastContainer} from 'react-toastify';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        
        <Route 
          path='/clients' 
          element={<ClientsPage />} 
        />
      </Routes>
    </div>
  );
}

export default App;