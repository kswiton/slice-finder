import { createContext, useContext } from "react";
import { auth } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

const UserContext = createContext({
  isLoading: true,
  isLoggedIn: false,
});

export const UserProvider = ({ children }) => {
  const [user, loadingFirebase] = useAuthState(auth);
  const isLoading = loadingFirebase;
  const isLoggedIn = !!user;

  return (
    <UserContext.Provider value={{ isLoggedIn, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useLoginStatus = () => {
  return useContext(UserContext);
};
