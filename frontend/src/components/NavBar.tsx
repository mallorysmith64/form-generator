import React from "react";
import test_logo from "../img/test_logo.jpg"

const NavBar = () => {
   return (
      <>
         <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
               <a className="navbar-item" href="https://bulma.io">
                  <img src={test_logo} width="30" height="30" />
                  <h1>Form Builder</h1>
               </a>

               <a
                  role="button"
                  className="navbar-burger"
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarBasicExample"
               >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
               </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
               <div className="navbar-start">
                  <a className="navbar-item">Create Form</a>

                  <a className="navbar-item">Templates</a>

                  <div className="navbar-item has-dropdown is-hoverable">
                     <a className="navbar-link">Support</a>

                     <div className="navbar-dropdown">
                        <a className="navbar-item">Contact Us</a>
                        <a className="navbar-item">Help</a>
                        <hr className="navbar-divider" />
                        <a className="navbar-item">Report an issue</a>
                     </div>
                  </div>
               </div>

               <div className="navbar-end">
                  <div className="navbar-item">
                     <div className="buttons">
                        <a className="button is-primary">
                           <strong>Sign up</strong>
                        </a>
                        <a className="button is-light">Log in</a>
                     </div>
                  </div>
               </div>
            </div>
         </nav>
      </>
   );
};

export default NavBar;
