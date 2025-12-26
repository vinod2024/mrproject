import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';



// import { HeroSection } from "./components/HeroSection";
// import { Header } from "./layouts/header";
// import Footer from "./layouts/footer";
import ErrorPage from './layouts/errorPage';

import LoginForm from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import {MailVarification} from "./components/MailVarification";
import PrivateRoute from './components/PrivateRoute';
import TitleManager from './components/TitleManager';
import {TodoList} from './components/TodoList';

import "./App.css";
import { Home } from './components/Home';
import {Movies} from './components/Movies';
import { store } from './app/store.jsx';
import { Provider } from "react-redux";
import { Posts } from './components/Posts';
import AddPost from './components/AddPost';
import NavigationProvider from "./components/NavigationProvider";

const App = () => {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavigationProvider />
          <TitleManager />
          <AppLayout />
        </>
      ),
      handle: { title: "Home" },
      /* 
      path: '/',
      element: <AppLayout />, */
      // errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Home />,
          handle: { title: "Home" },
        },
        {
          path: '/login',
          element: <LoginForm />,
          handle: { title: "Login" },
        },
        {
          path: '/profile',
          element: 
          <PrivateRoute>
            <Profile />
          </PrivateRoute>,
          handle: { title: "Profile" },
        },
        
        {
          path: '/sign-up',
          element: <Signup />,
          handle: { title: "SignUp" },
        },

        {
          path: '/mail-varification/:randomToken',
          element: <MailVarification />,
        },

        {
          path: '/todo',
          element: 
          <Provider store={store}>
            <TodoList />
          </Provider>
          ,
          handle: { title: "Todo List" },
        },
        {
          path: '/movies',
          element: <Movies />,
          handle: { title: "Movies" },
        },

        {
          path: '/posts/:pageno?',
          element: <Posts/>,
          handle: { title: "Posts" },
        },

        {
          path: '/add-posts/:postId?/:page?',
          element: <AddPost />,
          handle: { title: "Add Posts" },
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
