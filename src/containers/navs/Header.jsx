import React from "react";
import "../../assets/css/header.css";

const Header = () => {

  const navStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flex: "1",
  };


  return (
    <nav className="navbar">
      <a href="/" style={{textDecoration:'none', color:'white'}}>Home</a>
      <div
        style={navStyles}
      >
        <div className="text-container">
          <a href="/" style={{color:"white",fontSize:"30px",textDecoration:'none'}}>
          Inventory Management Application
          </a>
        </div>
      </div>
  
    </nav>
  );
};

export default Header;
