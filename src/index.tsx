import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App";
import "./assets/css/modern-normalize.css";
import "./styles/index.scss"
import Theme from "./themes";
import  AuthProvider from "./context/AuthContext";
import queryKeys from "modules/AuditTrailManagement/queryKeys";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 2,
    },
  },
});

queryClient.invalidateQueries([queryKeys.getAllAuditTrail]);

const RenderDevTool = () => {
  if (process.env.NODE_ENV === "development") {
    return <ReactQueryDevtools initialIsOpen={false} />;
  }
  return null;
};

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Theme>
            <App />
          </Theme>
        </Router>
      </AuthProvider>
      <RenderDevTool />
    </QueryClientProvider>
  </React.StrictMode>
);
