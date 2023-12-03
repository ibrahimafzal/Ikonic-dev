import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Post from './pages/Post';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from "./pages/Login"
import { OpenRoutes } from "./routing/OpenRoutes"
import { PrivateRoutes } from "./routing/PrivateRoutes"
import SinglePostDetails from './pages/SinglePostDetails';
import UserPosts from './pages/UserPosts';
import AddPost from './pages/AddPost';
import Admin from './pages/Admin';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Post />} />
          <Route path='/admin' element={<PrivateRoutes><Admin /></PrivateRoutes>} />
          <Route path='/post/:id' element={<AddPost />} />
          <Route path='/post' element={<AddPost />} />
          <Route path='/view-my-posts' element={<PrivateRoutes><UserPosts /></PrivateRoutes>} />
          <Route path='/signup' element={<OpenRoutes><Signup /></OpenRoutes>} />
          <Route path='/login' element={<Login />} />
          <Route path='/detail/:id' element={<SinglePostDetails />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
      />

    </div>
  );
}

export default App;
