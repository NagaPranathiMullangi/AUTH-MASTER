import React from 'react'
import { useLocation } from 'react-router-dom'
import LoginHeader from '../components/LoginHeader'
import Footer from '../components/Footer'
import LoginBox1 from '../components/LoginBox1'
import LoginBox2 from '../components/LoginBox2'
import LoginBox4 from '../components/LoginBox4'
import LoginBox3 from '../components/LoginBox3'



function LoginPage1() {

    const location = useLocation();
  const message = location.state?.message || "Default Login Page";
  const id = location.state?.id || "1";
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
     
    <LoginHeader message={message}/>
      <main className="flex-1 overflow-hidden">
        
      {
          id === "1" || id === "2" ? (
            <LoginBox1 id={id} />
          ) : id === "3" || id === "4" ? (
            <LoginBox2 id={id} />
          ) : id === "5" ? (
            <LoginBox3 id={id} />
          ) : id === "6" || id === "7" ? (
            <LoginBox4 id={id} />
          ) : (
            <LoginBox1 id={id} /> // fallback
          )
        }

     
        
      </main>

      <Footer />
    </div>
  )
}

export default LoginPage1
