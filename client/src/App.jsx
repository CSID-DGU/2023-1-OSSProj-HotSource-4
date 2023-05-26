import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notfound from "./pages/404";
import Class from "./pages/Class";
import {useState, useEffect } from "react";
import { Navigate } from "react-router-dom";


function App() {


  return (
        <BrowserRouter>
            {false ?  <Navigate replace to="/class/ossp" />: <Navigate replace to="/login" /> }
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login /> } />
            <Route path="/class/:className" element={<Class />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </BrowserRouter>
  );
}

export default App;
