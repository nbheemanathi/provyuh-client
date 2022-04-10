import React, { useState, useEffect } from "react";
import App from "./App";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

const httpLink = createHttpLink({
  // uri: "https://calm-everglades-22979.herokuapp.com/",
  uri:"http://localhost:4000"
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export default function Provider() {
  const [client, setClient] = useState(undefined);
  useEffect(() => {
    const cache = new InMemoryCache({
      
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache,
    });

    persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
    }).then(() => {
      setClient(client);
    });
    return () => {};
  }, []);
  if (client === undefined) return <div>Loading...</div>;

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}
