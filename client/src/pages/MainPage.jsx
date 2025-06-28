import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation ,Outlet} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from './Home';
import Register from './Register';

import Login from './Login';

export default function MainPage() {
 

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header  />

      <main className="flex-1 overflow-hidden">
        
          <Outlet/>
        
      </main>

      <Footer />
    </div>
  )
 
}
