import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// React query
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// React query devtools
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
  </QueryClientProvider>
);
