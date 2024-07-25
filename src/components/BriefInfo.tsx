import user from "../assets/imgs/users/avatar1.jpg";
import "../styles/BriefInfo.css";

const BriefInfo = () => {
  return (
    <div className="aside">
    <img src={user} alt="Descrição da imagem" className="aside__icon" />
    <div className="aside__info">
      <p className="aside__name">João Figueiredo</p>
      <p className="aside__date">20 de fev, 2019</p>
    </div>
  </div>

  );
};

export default BriefInfo;
