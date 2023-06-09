import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AllBlog from './components/AllBlog';
import AddBlog from './components/AddBlog'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {


  return (
    <>
      <Routes>

        
          
          
          <><Route path='/' element={<AllBlog />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/createBlog' element={<AddBlog />} />
          </>
     
      </Routes>



      <ToastContainer />
    </>
  );
}

export default App;
