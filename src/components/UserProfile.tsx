import { useData } from "../hooks/useData";
import { useEffect, useState } from "react";
import { fetchUsers, User } from "../types/Users";
import { FormatTimestamp } from "../utils/FormatTimestamp";
import "../styles/UserProfile.css";
import userImage from "../assets/imgs/users/user-default.png";
interface UsersComponentProps {
  userId: number;
}

const UserProfile = ({ userId }: UsersComponentProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { loading } = useData();
  const foundUser = users.find((user) => user?.id === userId);
  const formattedDate = FormatTimestamp(foundUser?.memberSince);
  const allPosts = foundUser?.posts;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch (error) {
        setError("Erro ao carregar os dados.");
      }
    };

    fetchPosts();
  }, [users]);

  if (error) return <div>Error: {error}</div>;

  function limitarStringComReticencias(str: string) {
    return str.length > 55 ? str.substring(0, 55) + "..." : str;
  }

  allPosts?.forEach((element) => {
    if (element?.content)
      element.content = limitarStringComReticencias(element.content);
  });

  const getCommonFriendNames = () => {
    const firstUser = users[0] || { friendIds: [] };
    const foundUserFriendIds = foundUser?.friendIds || [];
    const userFriendIds = firstUser?.friendIds;

    const commonFriendIds = userFriendIds.filter((id) =>
      foundUserFriendIds.includes(id)
    );

    const commonFriendNames = commonFriendIds
      .map((id) => users.find((user) => user.id === id)?.username)
      .filter((name) => name !== undefined);

    return commonFriendNames;
  };

  const commonFriendNames = getCommonFriendNames();

  return (
    <div className="modal__card">
      <div className="modal__card_profile" key={foundUser?.id}>
        <img src={userImage} alt="Descrição da imagem" />
        <div className="modal__card_profile_name">{foundUser?.username}</div>
        <p className="modal__card_style_title">Data de filiação:</p>
        <p>{formattedDate}</p>
        <p className="modal__card_style_title"> Amigos em comuns: </p>
        <p>
          {commonFriendNames.length > 0
            ? commonFriendNames.join(", ")
            : "Nenhum amigo em comum"}
        </p>
        <div className="modal__card_btns">
          <button className="btn modal__btn">Adicionar Usuário</button>
          <button className="btn modal__btn">Remover Usuário</button>
          <button className="btn modal__btn">Enviar Mensagem </button>
          <button className="btn modal__btn">Reportar usuário</button>
        </div>
      </div>

      <div className="modal__card_posts">
        <div className="modal__card_profile_name __post"> Posts</div>
        <div className="modal__cards">
          {loading ? (
            <p>Carregando</p>
          ) : (
            <>
              {" "}
              {allPosts?.map((posts, index) => (
                <div key={index}>
                  <div className="modal__card_posts_content" >
                    <div className="modal__cards_posts_subscontent">
                      <p className="modal__card_style_title">Título:</p>
                      <p>{posts?.title}</p>
                    </div>
                    <div className="modal__cards_posts_subscontent">
                      <p className="modal__card_style_title">Subtítulo: </p>
                      <p>{posts?.subtitle}</p>
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: posts?.content }}></p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
