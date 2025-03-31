import React from 'react'


import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
 const Userlayout = () => {
  return (
    <div>
        <Outlet/>
        <Footer/>
    </div>
  )
}
