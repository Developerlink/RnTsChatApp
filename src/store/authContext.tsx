import React, {createContext, useState, FC, useContext, useEffect} from 'react';

interface IAuthContext {
  isLoggedIn: boolean;
  onLogOut: () => void;
  onLogIn: (email: string, password: string) => void;
}

const initialState: IAuthContext = {
  isLoggedIn: false,
  onLogOut: () => {},
  onLogIn: (email: string, password: string) => {},
};

const AuthContext = createContext<IAuthContext>(initialState);

export const AuthContextProvider: FC = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
    }, 3000);
  }, []);

  const onLogOut = () => {
    setIsLoggedIn(false);
  };

  const onLogIn = (email: string, password: string) => {
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{isLoggedIn, onLogOut, onLogIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
