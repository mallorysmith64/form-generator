import React from "react";

const Footer = () => {
   const getYear = new Date().getFullYear();

   return (
      <>
         <footer className="footer">
            <div className="content has-text-centered">
               <p>
                  <span>Copyright &copy; {getYear} Form Factory Corp. All rights reserved.</span>
               </p>
            </div>
         </footer>
      </>
   );
};

export default Footer;
