import { createRoot } from "react-dom/client";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App.tsx";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql", // URL do endpoint GraphQL do backend
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode> {/* Comente ou remova o StrictMode */}
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  // </StrictMode>
);