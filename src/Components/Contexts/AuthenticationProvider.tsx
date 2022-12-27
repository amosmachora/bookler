import React, { createContext } from "react";
import { Assets } from "../../Assets/Assets";
import { Authenticator } from "../../Types/Contexts";

export const AuthProvider = createContext<Authenticator>(null as any);
const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AuthProvider.Provider
      value={{
        accountType: "Personal Account",
        profilePicture: Assets.ProfilePicture,
        userName: "Mansurul Haque",
        birthday: null,
        gender: null,
        address: null,
        login: {
          emailAddress: "Myemail@test.gmail.com",
          mobileNumber: null,
          password: "sysvysmoom",
        },
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
};

export default AuthenticationProvider;
