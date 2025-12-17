import React from "react";
const Footer = () => {
  return <>
    <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
            
            <div className="container">
                <div className="copyright">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            &copy; All Right Reserved. 
							                
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <div className="footer-menu">
                                <a href="home">Home</a>
                                <a href="faqs">FQAs</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
  </>;
};
export default Footer;