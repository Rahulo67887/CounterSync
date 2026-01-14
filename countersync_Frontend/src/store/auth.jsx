import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext();

const TOKEN_KEY="token";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(()=>{
    const storedToken=localStorage.getItem(TOKEN_KEY)
    if(storedToken){
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);


  const login = (newToken) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  const logOutUser = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };


  const value=useMemo(
    ()=>({
      token,
      isLoggedIn: Boolean(token),
      login,
      logOutUser,
      isLoading,
    }),
    [token, isLoading]
  )
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if(!authContextValue){
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return authContextValue;
};
