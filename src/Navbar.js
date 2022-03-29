import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from './logo.png'

function Logout() {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
}

export default function Navbar(props) {
  
  return (
    
    <div>
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
        <div className="container-fluid">
          <a href="#" className="navbar-brand" style={{color: '#ffb7c5'}}>
          <img src={logo} width="30" height="30" class="d-inline-block align-top" alt=""></img>
            Rycle's
          </a>

          {/* button toogler */}
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#myNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* define menu */}
          <div className="collapse navbar-collapse" id="myNav" >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"  >
              <li className="nav-item" >
                <Link to="/" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/member" className="nav-link">
                  Member
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/transaksi" className="nav-link">
                  Transaksi
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/paket" className="nav-link">
                  Paket
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/users" className="nav-link">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/form-transaksi" className="nav-link">
                  Transaksi baru
                </Link>
              </li>
                
              <li className="nav-item">
                <Link to="/login" className="nav-link " style={{color: '#ffb7c5'}} onClick={() => Logout()}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {props.children}
    </div>
  );
}