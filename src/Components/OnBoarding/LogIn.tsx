import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Assets } from "../../Assets/Assets";
import { isLinkClickable } from "../../Util/Helpers";
import { AuthProvider } from "../Contexts/AuthenticationProvider";
import jwt_decode from "jwt-decode";
import { Authenticator } from "../../Types/Contexts";

const LogIn = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [rememberForThirtyDays, setRememberForThirtyDays] =
    useState<boolean>(false);
  const isClickable = isLinkClickable(email, password);
  const { setUserData } = useContext(AuthProvider);

  const handleLogin = () => {
    //Here is where maybe i call a backend service or something
    setUserData((prevState) => {
      return {
        ...prevState,
        name: "Test user",
        email: email,
        password: password,
      };
    });
  };

  const handleCallBackResponse = (response: any) => {
    const userObject: Authenticator = jwt_decode(response.credential);
    console.log(userObject);
    setUserData((prev) => {
      return {
        ...prev,
        ...userObject,
      };
    });
  };

  useEffect(() => {
    // @ts-ignore:next-line
    google.accounts.id.initialize({
      client_id:
        "620329238439-508a2loab4eef8eo8kjma93m6iqekbdp.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });
    // @ts-ignore:next-line
    google.accounts.id.renderButton(
      document.getElementById("logInWithGoogleDiv"),
      { theme: "outline", size: "large" }
    );
    // @ts-ignore:next-line
    google.accounts.id.prompt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen flex">
      <div className="w-1/2 relative">
        <img
          src={Assets.LoginPageImage}
          alt="login"
          className="w-full object-cover h-full"
        />
        <div className="absolute bottom-14 w-full px-24">
          <p className="font-bold text-4xl text-white">
            Ready, set, travel the <br />
            world at ease
          </p>
          <p className="text-sm text-white mt-5">
            Start for free and get attractive offers from the community
          </p>
        </div>
      </div>
      <div className="bg-loginPageBg w-1/2 py-20 px-28 relative">
        <p className="text-red-500 absolute top-0">
          Currently the app is in test mode , if google sign in doesnt work just
          type random characters and hit login
        </p>
        <div className="flex items-center">
          <img src={Assets.InteractiveStar} alt="star" className="mr-2" />
          <p className="font-semibold text-sm">Interactive Brand</p>
        </div>
        <div className="mt-[12%]">
          <p className="font-bold text-3xl">Welcome back, User</p>
          <p className="text-sm">Welcome back! Please enter your details.</p>
        </div>
        <div className="border flex rounded-md justify-center py-4 mt-[5%] cursor-pointer hover:border-gray-400 transition-all">
          <div className="flex" id="logInWithGoogleDiv">
            <img src={Assets.Google} alt="Google" className="h-6 w-6 mr-2" />
            <p>Log in with Google</p>
          </div>
        </div>
        <div className="h-[1px] bg-gray-300 relative my-[8%]">
          <p className="text-xs center-absolutely bg-loginPageBg py-1 px-1">
            Or
          </p>
        </div>
        <input
          type="email"
          placeholder="Email"
          className="bg-transparent w-full text-black border-b border-gray-400 mb-4 px-2 py-1 focus:outline-none text-sm placeholder:text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="Password"
          placeholder="Password"
          className="bg-transparent w-full text-black border-b border-gray-400 mb-4 px-2 py-1 focus:outline-none text-sm placeholder:text-black"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between text-xs mb-[10%]">
          <div className="flex">
            <input
              type="checkbox"
              className="mr-1"
              name="RememberForThirtyDays"
              onChange={(e) => setRememberForThirtyDays(e.target.checked)}
            />
            <p>Remember for 30 days</p>
          </div>
          <p className="underline cursor-pointer">Forgot password</p>
        </div>
        <button
          className="text-white bg-black rounded-md w-full py-4 text-xs disabled:bg-gray-400"
          type="submit"
          disabled={!isClickable}
          onClick={handleLogin}
        >
          Log in
        </button>
        <p className="text-xs text-center mt-4 absolute bottom-7 left-1/2 -translate-x-1/2">
          Don’t have an account?{" "}
          <Link className="font-semibold underline" to={"/onboarding"}>
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
