import "../styles/UsersContent.css";

import userImage from "../assets/imgs/users/user-default.png";
import { useEffect, useState } from "react";
import { fetchUsers, User } from "../types/fetchUsers";
import { formatTimestamp } from "../utils/dateUtils";

interface UsersComponentProps {
  userId: number;
}

const UsersContent = ({ userId }: UsersComponentProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const foundUser = users.find((user) => user?.id === userId);
  const formattedDate = formatTimestamp(foundUser?.memberSince);
  const allPosts = foundUser?.posts;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch (error) {
        setError("Erro ao carregar os dados.");
      }
    };

    fetchData();
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
        <p>Data de filiação:</p>
        <p>{formattedDate}</p>

        <div>
          Amigos em comuns:{" "}
          <p>
            {commonFriendNames.length > 0
              ? commonFriendNames.join(", ")
              : "Nenhum amigo em comum"}
          </p>
        </div>

        <div className="modal__card_btns">
          <button className="btn">Adicionar Usuário</button>
          <button className="btn">Remover Usuário</button>
          <button className="btn">Enviar Mensagem </button>
          <button className="btn">Reportar usuário</button>
        </div>
      </div>

      <div className="modal__card_posts">
        <div className="modal__card_profile_name"> Posts</div>
        {allPosts?.map((posts, index) => (
          <div className="modal__card_posts_content" key={index}>
            <div className="modal__cards_posts_subscontent">
              titulo: <p>{posts?.title}</p>
            </div>
            <div className="modal__cards_posts_subscontent">
              subtitulo: <p>{posts?.subtitle}</p>
            </div>
            <p dangerouslySetInnerHTML={{ __html: posts?.content }}></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersContent;
