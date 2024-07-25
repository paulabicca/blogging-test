import "../styles/Comments.css";

const Comments = () => {
  return (
    <div className="main__comments">
      <h2 className="main__comments_title">Comentários</h2>
      <div>Joana Vasconcellos - 20 fev 2019, às 17h30</div>
      <div>
        O empenho em analisar a consolidação das estruturas oferece uma
        interessante oportunidade para verificação do retorno esperado a longo
        prazo. Por outro lado, o julgamento imparcial das eventualidades
        facilita a criação dos modos de operação convencionais.
      </div>
      <div className="main__comments_btns">
        <button className="btn">compartilhar</button>
        <button className="btn">responder</button>
        <button className="btn">reportar</button>
      </div>
    </div>
  );
};

export default Comments;
