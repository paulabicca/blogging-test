
import header from "../assets/imgs/header-image.jpg";
import MainContent from "./MainContent";
import "../styles/HomePage.css";
import React from 'react'

const HomePage = () => {
  return (
    <div className="container">
      <header className="header">
        <div className="header__content">
          <p className="header__text">Blogging</p>
        </div>
        <img src={header} alt="Imagem do banner" className="header__image" />
      </header>
      <MainContent/>
    </div>
  );
};

export default HomePage;
