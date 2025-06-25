import { createContext, useContext } from "react";

const UserContext = createContext();

export const useUser = () => {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error("useUser called outside <UserProvider>");
  }
  return user;
};

export const UserProvider = ({ children }) => {
  const currentUser = {
    username: "grumpy19",
    name: "Paul Grump",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
  };

  return (
    <UserContext.Provider value={{ currentUser, isLoggedIn: true }}>
      {children}
    </UserContext.Provider>
  );
};
