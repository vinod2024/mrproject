import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import ErrorPage from '../layouts/errorPage';

import LoginForm from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
// import TitleManager from "./components/TitleManager";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // { index: true, element: <LoginForm />, title: "Home default" },
      { path: "login", element: <LoginForm />, title: "Home 1 | Login" },
      { path: "profile", element: <Profile />, title: "Profile" },
      { path: "sign-up", element: <Signup />, title: "Home | Sign Up" },
      { path: "*", element: <ErrorPage />, title: "Home | Error" }
    ]
  }
]);
