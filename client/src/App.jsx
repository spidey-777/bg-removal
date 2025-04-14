import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import Buycredit from './pages/Buycredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


export default function App() {
  return (
    <div className='min-h-screen  bg-slate-50'>
    <Navbar />

    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/results' element={<Result/>} />
      <Route path='/buycredit' element={<Buycredit/>} />
    </Routes>
    <Footer/>
    </div>
  )
}
