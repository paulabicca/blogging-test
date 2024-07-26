import user from "../assets/imgs/users/avatar1.jpg";
import Comments from "./Comments";
import { usePost } from "../hooks/usePost";

const MainContent = () => {
  const { post, formattedDate, loading, error } = usePost();

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
        <img src={user} alt="Descrição da imagem" className="aside__icon" />
        <div className="aside__info">
          <p className="aside__name">{post.author.username}</p>
          <p className="aside__date">{formattedDate}</p>
        </div>
      </div>

      <p
        className="main__content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <Comments />
    </main>
  );
};

export default MainContent;
