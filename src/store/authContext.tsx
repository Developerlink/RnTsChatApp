import React, {
  createContext,
  useState,
  FC,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';


interface IAuthContext {
  user: FirebaseAuthTypes.User | null;
  setUser: Dispatch<SetStateAction<FirebaseAuthTypes.User | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  onLogOut: () => void;
  onLogIn: (user: FirebaseAuthTypes.User) => void;
}

const initialState: IAuthContext = {
  user: null,
  setUser: () => {},
  isLoading: true,
  setIsLoading: () => {},
  onLogOut: () => {},
  onLogIn: (user: FirebaseAuthTypes.User) => {},
};

const AuthContext = createContext<IAuthContext>(initialState);

export const AuthContextProvider: FC = ({children}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Don't seem to be doing anything
  const onLogOut = () => {
    setUser(null);
  };

  // Don't seem to be doing anything
  const onLogIn = (user: FirebaseAuthTypes.User) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{user, setUser, isLoading, setIsLoading, onLogOut, onLogIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
