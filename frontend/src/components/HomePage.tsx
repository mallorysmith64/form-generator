import React from "react";
import "./index.scss";
import NavBar from "./NavBar";

const HomePage = () => {
   return (
      <>
         <NavBar />
         <header className="header-wrapper">
            <h1 className="header">Create any form with Form Factory</h1>
         </header>
      </>
   );
};

export default HomePage;
