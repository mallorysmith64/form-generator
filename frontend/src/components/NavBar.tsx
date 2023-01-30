import { Link } from "react-router-dom";
import test_logo from "../img/test_logo.jpg";

const NavBar = () => {
   return (
      <>
         <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
               <Link to="/#" className="navbar-item">
                  <img src={test_logo} width="30" height="30" />
                  <Link to="/#" className="navbar-item">
                     Form Builder
                  </Link>
               </Link>

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
                  <Link to="/FormBuilder" className="navbar-item">
                     Create Form
                  </Link>

                  <Link to="/Templates" className="navbar-item">
                     Templates
                  </Link>

                  {/* <div className="navbar-item has-dropdown is-hoverable">
                  <Link to="/Support" className="navbar-item">
                     Support
                  </Link>

                     <div className="navbar-dropdown">
                        <a className="navbar-item">Contact Us</a>
                        <a className="navbar-item">Help</a>
                        <hr className="navbar-divider" />
                        <a className="navbar-item">Report an issue</a>
                     </div>
                  </div> */}
               </div>

               <div className="navbar-end">
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
               </div>
            </div>
         </nav>
      </>
   );
};

export default NavBar;
