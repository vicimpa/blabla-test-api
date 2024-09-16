import { useAsync } from "./hooks/useAsync";
import { usersApi } from "./api/users";

export const App = () => {
  const [users, loading, error] = useAsync(() => (
    usersApi.getUsers()
  ));

  if (loading)
    return <p>Loading...</p>;


  if (error)
    return <p>Ошибка у нас {`${error}`}</p>;

  return (
    null
  );
};