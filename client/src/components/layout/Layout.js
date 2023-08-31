import React from 'react'
import Header from './Header';
import Footer from './Footer';
import {Toaster} from 'react-hot-toast';

function Layout({children}) {
  return (
   <div>
    <Header />
    <main style={{minHeight:"70vh"}}>{children}</main>
    <Toaster/>
    <Footer/>
   </div>
  )
}

export default Layout