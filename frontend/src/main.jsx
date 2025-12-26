import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./components/AuthContext.jsx";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();
   
createRoot(document.getElementById("root")).render(
  
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <App />
      
    </AuthProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
  
);
