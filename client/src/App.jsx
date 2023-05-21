import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notfound from "./pages/404";
import Class from "./pages/Class";
import {ApolloClient, ApolloProvider, gql, InMemoryCache, useMutation} from "@apollo/client";
import {useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {getCurrentUser, logout} from "./components/services/authService";

function App(props) {

  const client = new ApolloClient(
      {
        uri: "http://localhost:4000",
        cache: new InMemoryCache(),
      }
  )

  const [ token, setToken ] = useState("");
  const [ user, setUser ] = useState({});
  const [isLogin, setIsLogin ] = useState(false);

  useEffect(() => {
      const data = getCurrentUser();

      if (data) {
          setIsLogin(!isLogin)
          setUser(data.login.user)
          setToken(data.login.token)
      }

  }, [])


  console.log(token, user.username, isLogin);

  return (
      <ApolloProvider client={client}>
        <BrowserRouter>
            {isLogin ?  <Navigate replace to="/class/ossp" />: <Navigate replace to="/login" /> }
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setToken={setToken} setUser={setUser} setIsLogin={setIsLogin} isLogin={isLogin} /> } />
            <Route path="/class/:className" element={<Class setToken={setToken} setUser={setUser} setIsLogin={setIsLogin} isLogin={isLogin} user={user} />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
  );
}

export default App;
