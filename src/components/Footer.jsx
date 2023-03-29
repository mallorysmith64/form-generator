import React from "react";

function Footer() {
  let getYear = new Date().getFullYear();

  return (
    <>
      <footer className="page-footer">
        <section className="copyright">
          <p>Copyright Mallory Smith {getYear}</p>
        </section>
      </footer>
    </>
  );
}

export default Footer;
