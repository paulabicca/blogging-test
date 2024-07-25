import "../styles/BloggingHome.css";
import header from "../assets/imgs/header-image.jpg";
import Comments from "./Comments";
import BriefInfo from "./BriefInfo";

const BloggingHome = () => {
  return (
    <div className="container">
      <header className="header">
        <div className="header__content">
          <p className="header__text">Blogging</p>
        </div>
        <img src={header} alt="Descrição da imagem" className="header__image" />
      </header>

      <main className="main">
        <div className="main__title__subtitle">
          <h1>Estratégias em um novo paradigma globalizado</h1>
          <em>
            Sobre o cuidado em identificar pontos críticos na complexidade
          </em>
        </div>
        
        <BriefInfo/>

        <p className="main__content">
          Caros amigos, a mobilidade dos capitais internacionais desafia a
          capacidade de equalização das diversas correntes de pensamento. Nunca
          é demais lembrar o peso e o significado destes problemas, uma vez que
          a necessidade de renovação processual ainda não demonstrou
          convincentemente que vai participar na mudança das diretrizes de
          desenvolvimento para o futuro. O cuidado em identificar pontos
          críticos na complexidade dos estudos efetuados é uma das consequências
          das direções preferenciais no sentido do progresso. Do mesmo modo, a
          adoção de políticas descentralizadoras não pode mais se dissociar dos
          modos de operação convencionais. Acima de tudo, é fundamental
          ressaltar que o novo modelo estrutural aqui preconizado cumpre um
          papel essencial na formulação das novas proposições. A nível
          organizacional, o desenvolvimento contínuo de distintas formas de
          atuação oferece uma interessante oportunidade para verificação dos
          conhecimentos estratégicos para atingir a excelência. Por outro lado,
          a constante divulgação das informações exige a precisão e a definição
          do sistema de formação de quadros que corresponde às necessidades. É
          claro que a contínua expansão de nossa atividade estimula a
          padronização das condições inegavelmente apropriadas.
        </p>

       <Comments/>

      </main>
    </div>
  );
};

export default BloggingHome;
