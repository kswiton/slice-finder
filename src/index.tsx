import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./Auth/AuthContext";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";

import ErrorPage from "./Pages/ErrorPage";
import Pizza from "./features/pizza/Pizza";
import Login from "./Pages/Login";
import App from "./App";
import SignUp from "./Pages/SignUp";
import HomePage from "./Layout/HomePage";
import AddPizzas from "./Layout/AddPizzas";

const queryClient = new QueryClient();
const container = document.getElementById("root")!;
const root = createRoot(container);
const router = createBrowserRouter([
  {
    path: "/",

    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "pizza",
        element: <Pizza />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/addpizza",
    element: <AddPizzas />,
  },
]);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <UserProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </UserProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
