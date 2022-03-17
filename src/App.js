import React from "react";
import "./App.css";
import Member from "./pages/Member";
import Paket from "./pages/Paket";
import Users from "./pages/Users";
import FormTransaksi from "./pages/FormTransaksi"
import Transaksi from "./pages/Transaksi"
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./pages/Dashboard";
import Footer from "./footer";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar><Dashboard/><Footer/></Navbar>}/>
        <Route path="/transaksi" element={<Navbar><Transaksi/><Footer/></Navbar>}/>
        <Route path="/member" element={<Navbar><Member/><Footer/></Navbar>}/>
        <Route path="/paket" element={<Navbar><Paket/><Footer/></Navbar>}/>
        <Route path="/users" element={<Navbar><Users/><Footer/></Navbar>}/>
        <Route path="/form-transaksi" element={<Navbar><FormTransaksi/><Footer/></Navbar>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}