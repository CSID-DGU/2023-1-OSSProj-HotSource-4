import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import client from "./apolloClient";
import {ChakraProvider} from "@chakra-ui/react";
import {ApolloProvider} from '@apollo/react-hooks'
import { AuthProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <ApolloProvider client={client} >
                <ChakraProvider>
                    <App />
                </ChakraProvider>
        </ApolloProvider>
    </AuthProvider>
);

