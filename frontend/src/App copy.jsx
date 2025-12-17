import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';

// import { HeroSection } from "./components/HeroSection";
import { Header } from "./layouts/header";
import Footer from "./layouts/footer";
import ErrorPage from './layouts/errorPage';

import LoginForm from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";


import "./App.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <LoginForm />,
        },
        {
          path: '/login',
          element: <LoginForm />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        
        {
          path: '/sign-up',
          element: <Signup />,
        },
        {
          path: '*',
          element: <ErrorPage />,
        },
      ],
      
    }
    
  ],
    /* {
        basename: '/dist',
      } */
     );
  return <RouterProvider router={router} />;
};

export default App;
