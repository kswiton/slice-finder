import { useLoginStatus } from "./Auth/AuthContext";
import Layout from "./Layout/Layout";
import Loading from "./Layout/Loading";
import { Navigate } from "react-router-dom";

const App = () => {
  const { isLoggedIn, isLoading } = useLoginStatus();
  if (isLoading) return <Loading />;
  if (!isLoggedIn) return <Navigate to="/login" />;
  return <Layout />;
};

export default App;
