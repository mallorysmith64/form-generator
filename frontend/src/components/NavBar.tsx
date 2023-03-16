import React from "react";
import { Link } from "react-router-dom";
import test_logo from "../img/test_logo.jpg";
// import { useLocation } from "react-router-dom";

const NavBar = () => {
   // const { pathname } = useLocation();
   // console.log(pathname);

   return (
      <>
         <nav className="navbar" role="navigation" aria-label="main navigation">
            <section className="navbar-left">
               <div className="navbar-brand">
                  {/* <Link to="/#" className="navbar-item">
                     <img src={test_logo} width="30" height="30" />
                  </Link> */}

                  <Link to="/#" className="navbar-item">
                     Form Factory
                  </Link>
               </div>

               <div className="navbar-menu">
                  <div className="navbar-start">
                     <Link to="/FormBuilder" className="navbar-item">
                        Create Form
                     </Link>

                     <Link to="/Publish" className="navbar-item">
                        Publish
                     </Link>
                  </div>
               </div>
            </section>

            {/* <div className="navbar-end">
                  <div className="navbar-item">
                     <div className="buttons">
                        <Link to="/SignUp" className="button is-primary">
                           <strong>Sign Up</strong>
                        </Link>

                        <Link to="/Login" className="button is-light">
                           <strong>Login</strong>
                        </Link>
                     </div>
                  </div>
               </div> */}
         </nav>
      </>
   );
};

export default NavBar;
