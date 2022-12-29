import React from "react";
import { Link } from "react-router-dom";
import { Assets } from "../../Assets/Assets";

const SignUp = () => {
  return (
    <div className="h-screen flex">
      <div className="w-1/2 relative">
        <img
          src={Assets.NewYork}
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
      <div className="bg-loginPageBg w-1/2 py-16 px-28 relative">
        <div className="flex items-center">
          <img src={Assets.InteractiveStar} alt="star" className="mr-2" />
          <p className="font-semibold text-sm">Interactive Brand</p>
        </div>
        <div className="my-[8%]">
          <p className="font-bold text-3xl">Create an account</p>
          <p className="text-sm">
            Let’s get started with your 30day free trial.
          </p>
        </div>
        <input
          type="text"
          placeholder="Username"
          className="bg-transparent w-full text-black border-b border-gray-400 mb-4 px-2 py-1 focus:outline-none text-sm placeholder:text-black"
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-transparent w-full text-black border-b border-gray-400 mb-4 px-2 py-1 focus:outline-none text-sm placeholder:text-black"
        />
        <input
          type="Password"
          placeholder="Password"
          className="bg-transparent w-full text-black border-b border-gray-400 mb-4 px-2 py-1 focus:outline-none text-sm placeholder:text-black"
        />
        <button className="text-white bg-black rounded-md w-full py-4 text-xs mt-10">
          Create account
        </button>
        <div className="h-[1px] bg-gray-300 relative my-[8%]">
          <p className="text-xs center-absolutely bg-loginPageBg py-1 px-1">
            Or
          </p>
        </div>
        <div className="border flex rounded-md justify-center py-4 mt-[5%] cursor-pointer hover:border-gray-400 transition-all">
          <div className="flex">
            <img src={Assets.Google} alt="Google" className="h-6 w-6 mr-2" />
            <p>Sign up with Google</p>
          </div>
        </div>
        <p className="text-xs text-center mt-4 absolute bottom-7 left-1/2 -translate-x-1/2">
          Already have an account?{" "}
          <Link className="font-semibold underline" to={"/login"}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
