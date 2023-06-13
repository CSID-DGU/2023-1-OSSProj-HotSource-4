import {createHttpLink, InMemoryCache, ApolloClient} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const END_POINT = "http://localhost:4000"

const httpLink = createHttpLink({
    uri: END_POINT
});

const authLink = setContext( (_, { headers }) => {
    return {
        headers : {
            ...headers,
            authorization: localStorage.getItem("token") || ""
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;