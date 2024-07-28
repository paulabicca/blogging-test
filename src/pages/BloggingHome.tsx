
import header from "../assets/imgs/header-image.jpg";
import MainContent from "./MainContent";
import "../styles/BloggingHome.css";

const BloggingHome = () => {
  return (
    <div className="container">
      <header className="header">
        <div className="header__content">
          <p className="header__text">Blogging</p>
        </div>
        <img src={header} alt="Descrição da imagem" className="header__image" />
      </header>
      <MainContent/>
    </div>
  );
};

export default BloggingHome;
