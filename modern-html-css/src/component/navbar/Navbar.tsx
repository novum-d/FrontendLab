import React from "react";
import styled from "./styles.module.scss";

const Navbar = () => {
  return (
    <div className={styled.body}>
      <nav className={styled.body} role="navigation">
        <div className={styled.menuToggle}>
          <input type="checkbox" />

          <span></span>
          <span></span>
          <span></span>

          <ul className={styled.menu}>
            <a href="#">
              <li>Home</li>
            </a>
            <a href="#">
              <li>About</li>
            </a>
            <a href="#">
              <li>Info</li>
            </a>
            <a href="#">
              <li>Contact</li>
            </a>
            <a href="https://erikterwan.com/" target="_blank">
              <li>Show me more</li>
            </a>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
