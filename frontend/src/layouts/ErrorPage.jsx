import React from "react";
const ErrorPage = () => {
  return <>
    <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: "600px"}}>
                <h1 className="mb-3">Error Page</h1>
                <p>The page you are looking for does not exist or an other error occurred.</p>
            </div>
        </div>
    </div>
  </>;
};

export default ErrorPage;