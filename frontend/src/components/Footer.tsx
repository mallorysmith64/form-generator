import React from "react";

const Footer = () => {
   const getYear = new Date().getFullYear();

   return (
      <>
         <footer className="footer">
            <div className="content has-text-centered">
               <span>Copyright &copy; {getYear} Form Factory Corp. All rights reserved.</span>
            </div>
         </footer>
      </>
   );
};

export default Footer;
