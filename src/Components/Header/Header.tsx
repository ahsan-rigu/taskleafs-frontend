import React from "react";
import "./Header.css";
import ThemeButton from "../ThemeButton/ThemeButton";
import { BsBell, BsPersonCircle, BsSearch } from "react-icons/bs";

const Header = () => {
  return (
    <>
      <div className="header-placeholder"></div>

      <header className="top-bar">
        <span className="logo">TaskLeafs</span>
        <button title="search">
          <BsSearch size={"1.5rem"} />
        </button>
        <button title="Notifications">
          <BsBell size={"1.5rem"} />
        </button>
        <button title="person">
          <BsPersonCircle size={"1.5rem"} />
        </button>
        <ThemeButton />
      </header>
    </>
  );
};

export default Header;
