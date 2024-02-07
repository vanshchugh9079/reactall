import React from 'react'  
import "./style.css";
import { Container } from 'react-bootstrap';
import Layout from './Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Music from './pages/Music';
export default function App() {
  return (
   <Container fluid className='p-0 m-0'>
        <BrowserRouter >
          <Routes>
              <Route index element={<Layout/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/signup' element={<Signup/>}></Route>
              <Route path='/music' element={<Music/>}></Route>
          </Routes>
        </BrowserRouter>
   </Container>
  )
}
