import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notfound from "./pages/404";
import Class from "./pages/Class";
import {useState, useEffect, useContext} from "react";
import { Navigate } from "react-router-dom";




function App(props) {




  return (
        <BrowserRouter>
            {localStorage.getItem("token") ?  <Navigate replace to={`/class`} />: <Navigate replace to="/login" /> }
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login /> } />
            <Route path="/class/" element={<Class />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </BrowserRouter>
  );
}

export default App;
