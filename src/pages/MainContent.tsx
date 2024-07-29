import user from "../assets/imgs/users/avatar1.jpg";
import CommentsList from "./CommentsList";
import { useData } from "../hooks/useData";

const MainContent = () => {
  const { post, formattedDate, loading, error } = useData();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post não encontrado.</p>;

  return (
    <main className="main">
      <div className="main__title__subtitle">
        <h1>{post.title}</h1>
        <em>{post.subtitle}</em>
      </div>

      <div className="aside">
        <img src={user} alt="Imagem do usuário" className="aside__icon" />
        <div className="aside__info">
          <p className="aside__name">{post.author.username}</p>
          <p className="aside__date">{formattedDate}</p>
        </div>
      </div>

      <p
        className="main__content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <CommentsList />
    </main>
  );
};

export default MainContent;
