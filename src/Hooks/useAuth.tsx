import { useLocalStorage } from './useLocalStorage';

export interface User {
  id: string;
  email: string | null;
  picture: string | null;
  name: string;
  accountType?: string | null;
  birthday?: string | null;
  gender?: string | null;
  address?: string | null;
  aud?: string;
  azp?: string;
  email_verified?: boolean;
  exp?: number;
  family_name?: string;
  given_name?: string;
  iat?: number;
  iss?: string;
  jti?: string;
  nbf?: string;
  sub?: string;
  mobileNumber?: string | null;
  phoneNumber?: string | null;
}

export const useAuth = () => {
  const [user, setUserData] = useLocalStorage<User>(
    {
      id: '',
      accountType: '',
      picture: null,
      name: '',
      email: null,
      birthday: null,
      address: null,
      gender: null,
    },
    'userData'
  );
  return {
    user,
    setUserData,
  };
};
