import React, { useEffect, useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';
import './styles.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = '/';
  };

  useEffect (()=>{
    if(localStorage.getItem("token")){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  },[]);
  console.log(isLoggedIn)

  return (
    <header className="header">
      <div className={"nav-icon react-icons"}>
        {isLoggedIn &&<FaBars/>}
      </div>
      
      <div className={"nav-icon react-icons"} onClick={isLoggedIn ? handleLogout : undefined}>
        {isLoggedIn &&<MdLogout/>}
      </div>
    </header>
  );
};

export default Navbar;
