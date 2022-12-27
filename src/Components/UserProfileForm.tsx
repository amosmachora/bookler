import React, { useContext } from "react";
import { Authenticator, LoginDetails } from "../Types/Contexts";
import { AuthProvider } from "./Contexts/AuthenticationProvider";
import NonNullUserInput from "./NonNullUserInput";
import NullUserFieldInput from "./NullUserFieldInput";
import ProfileCompleteness from "./ProfileCompleteness";
import { UserProfileTabLarge } from "./UserProfileTabLarge";

const UserProfileForm = () => {
  const auth = useContext(AuthProvider);
  const nullUserFields: string[] = getNullUserFields(auth);
  const nonNullUserFields: string[] = getNonNullUserFields(auth);

  const percentage: string = (
    (nonNullUserFields.length / Object.keys(auth).length) *
    100
  ).toFixed(0);

  return (
    <div className="mt-10 flex justify-between">
      <div className="w-3/4">
        <div className="flex px-5 bg-flightResultsBg py-2 rounded-sm mb-1 items-center justify-between">
          <p className="font-bold text-base">Profile</p>
        </div>
        <div className="bg-white rounded-md p-8 text-gray-400 text-xs flex justify-between">
          <div>
            <p className="font-bold text-black text-lg">
              Complete Your Profile
            </p>
            {nullUserFields.map((field, index) => (
              <div className="flex items-center mt-3">
                <p className="text-white bg-blue-600 px-1 rounded-sm mr-2">
                  {index + 1}
                </p>
                <p>{getCompleteYourProfileText(field)}</p>
              </div>
            ))}
          </div>
          <ProfileCompleteness percentage={parseInt(percentage)} />
        </div>
        <div className="bg-white rounded-md p-8 text-xs mt-4">
          <p className="font-bold text-lg">Profile</p>
          <p className="font-normal text-gray-400">
            Basic info, for a faster booking experience
          </p>
          {nonNullUserFields.map((field) => (
            <NonNullUserInput defaultValue={auth[field]} field={field} />
          ))}
          {nullUserFields.map((field) => (
            <NullUserFieldInput field={field} />
          ))}
        </div>
        <div className="bg-white rounded-md p-8 text-xs mt-4">
          <p className="font-bold text-lg">Login details</p>
          <p className="font-normal text-gray-400">
            Manage your email address mobile number and password
          </p>
          {getNullUserFields(auth.login).map((field) => (
            <NullUserFieldInput field={field} key={field} />
          ))}
          {getNonNullUserFields(auth.login).map((field) => (
            <NonNullUserInput defaultValue={auth.login[field]} field={field} />
          ))}
        </div>
      </div>
      <UserProfileTabLarge />
    </div>
  );
};

export default UserProfileForm;

const getNullUserFields = (auth: Authenticator | LoginDetails): string[] => {
  const keys = Object.keys(auth);
  const myArray: string[] = [];
  keys.forEach((key) => (auth[key] === null ? myArray.push(key) : null));

  return myArray;
};

const getNonNullUserFields = (auth: Authenticator | LoginDetails): string[] => {
  const keys = Object.keys(auth);
  const myArray: string[] = [];
  keys.forEach((key) =>
    auth[key] !== null && key !== "profilePicture" && key !== "login"
      ? myArray.push(key)
      : null
  );

  return myArray;
};

const getCompleteYourProfileText = (field: string): string => {
  if (field === "profilePicture") {
    return "Upload your profile picture";
  } else if (field === "birthday") {
    return "Add your birthday";
  } else if (field === "gender") {
    return "Add your gender";
  } else if (field === "address") {
    return "Add your address";
  } else {
    return field;
  }
};
