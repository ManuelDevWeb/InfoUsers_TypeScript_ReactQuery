// Custom hooks
import { useUsers } from "../hooks/useUsers";

const Results = () => {
  const { users } = useUsers();

  return <h3>Results {users.length}</h3>;
};

export { Results };
