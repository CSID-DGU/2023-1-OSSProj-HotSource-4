import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notfound from "./pages/404";
import Class from "./pages/Class";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";


function App() {
  const client = new ApolloClient(
      {
        uri: "http://localhost:3000",
        cache: new InMemoryCache(),
      }
  )

  return (<>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/class/:className" element={<Class />} />
            <Route path="/*" element={<Notfound />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
  </>);
}

export default App;
