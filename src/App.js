import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Login } from "./components/login/Login.js";
import { PrivateRoute } from './components/privateRoute/privateRoute';
import { Main } from './components/main/main';
import AuthProvider from './auth/AuthProvider';
import { RegisterUser } from './components/registerUser/RegisterUser';

function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Login/>} />
            <Route path="/registerUser" element={<RegisterUser/>} />
            <Route path="*" element={<Navigate to ="/" />}/>
            <Route path="/home" element= {<PrivateRoute><Main/></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
