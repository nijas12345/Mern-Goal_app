import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Headers from './components/Headers';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AddUser from './pages/Admin/AddUser';
import Profile from './pages/Admin/Profile';

function App() {
  return (
    <>
    <Router>
      <div className='container'>
        <Headers/>
        <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>

        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/login' element={<AdminLogin />}  />
        <Route path='/admin/adduser' element={<AddUser />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
