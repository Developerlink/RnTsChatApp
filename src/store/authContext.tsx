import React, {createContext, useState, FC, useContext, useEffect} from 'react';
import {boolean} from 'yup';

interface IAuthContext {
  isLoading: boolean;
  isLoggedIn: boolean;
  onLogOut: () => void;
  onLogIn: (email: string, password: string) => void;
}

const initialState: IAuthContext = {
  isLoading: true,
  isLoggedIn: false,
  onLogOut: () => {},
  onLogIn: (email: string, password: string) => {},
};

const AuthContext = createContext<IAuthContext>(initialState);

export const AuthContextProvider: FC = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const onLogOut = () => {
    setIsLoggedIn(false);
  };

  const onLogIn = (email: string, password: string) => {
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{isLoading, isLoggedIn, onLogOut, onLogIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
