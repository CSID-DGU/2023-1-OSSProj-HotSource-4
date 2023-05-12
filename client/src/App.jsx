import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notfound from "./pages/404";
import Class from "./pages/Class";


function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/class/:className" element={<Class />} />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  </>);
}

export default App;
