import React, { createContext, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { UserCredential } from 'firebase/auth';

interface UserContextValue {
  userCredential: UserCredential | null;
  setUserCredential: React.Dispatch<
    React.SetStateAction<UserCredential | null>
  >;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userCredential, setUserCredential] =
    useLocalStorage<UserCredential | null>(null, 'userData');

  return (
    <UserContext.Provider value={{ userCredential, setUserCredential }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = (): UserContextValue => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};
