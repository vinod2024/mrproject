import React from 'react';
import Footer  from "./footer";
import {Header} from "./header";
import {Outlet} from 'react-router-dom';
// import TitleManager from "../components/TitleManager";

export const AppLayout  = () => {
  return (
    <>
      <div className="container-xxl bg-white p-0">        
      <Header />
       {/* <TitleManager /> */}
      <Outlet />
      <Footer />
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
    </div>
    </>
  );
};

export default AppLayout;