import { UserCredential } from 'firebase/auth';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const [userCredential, setUserCredential] =
    useLocalStorage<UserCredential | null>(null, 'userData');
  return {
    userCredential,
    setUserCredential,
  };
};
