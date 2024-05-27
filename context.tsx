import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: string;
  name: string;
};

type AppContextProps = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const contextValue: AppContextProps = {
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
