import { useLoginStatus } from "./Auth/AuthContext";
import Layout from "./Layout/Layout";
import HomePage from "./Layout/HomePage";
import { Navigate } from "react-router-dom";

const App = () => {
  const { isLoggedIn, isLoading } = useLoginStatus();
  if (isLoading) return <HomePage />;
  if (!isLoggedIn) return <Navigate to="/login" />;
  return <Layout />;
};

export default App;
