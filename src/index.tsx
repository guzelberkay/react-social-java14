import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './pages/login/login';
import Home from './pages/home/Home';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = 
<BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
  </Routes>
</BrowserRouter>

root.render(router);

