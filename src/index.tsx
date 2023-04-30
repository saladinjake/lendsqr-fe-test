import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App";
import "./assets/css/modern-normalize.css";
import "./styles/index.scss"
import Theme from "./themes";

import queryKeys from "modules/AuditTrailManagement/queryKeys";

import { AuthProvider } from "./context/AuthContext";
import { Provider as PersistorContext } from "react-redux";
import store from "./store";
import { NotificationProvider } from 'context/NotificationContext';
import NotificationBar from 'components/shared/Notifier';

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
     <PersistorContext store={store}>
     <NotificationProvider>
          <NotificationBar />
   
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
    </NotificationProvider>
    </PersistorContext>
  </React.StrictMode>
);
