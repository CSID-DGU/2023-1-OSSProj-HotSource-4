import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notfound from "./pages/404";
import Class from "./pages/Class";


function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/class" element={<Class />} />
        <Route path="/404" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  </>);
}

export default App;
