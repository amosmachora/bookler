import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Assets } from '../../Assets/Assets';
import {
  createUserWithEmailAndPassword,
  getSignUpErrorMessage,
  signInWithGoogle,
} from '../../firebase';
import { useAuth } from '../../Hooks/useAuth';
import { AuthErrorMessage } from '../AuthErrorMessage';
import { CountryCodeSelector } from '../Hotel/CountryCodeSelector';

const SignUp = () => {
  const { setUserData } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const createAccount = async () => {
    setIsLoadingEmail(true);
    try {
      const user = await createUserWithEmailAndPassword(
        emailRef.current!.value!,
        passwordRef.current!.value!,
        {
          firstName: firstNameRef.current?.value!,
          lastName: lastNameRef.current?.value!,
        }
      );
      setUserData(user);
      navigate('/');
    } catch (error) {
      setErrorMessage(getSignUpErrorMessage(error));
    }
    setIsLoadingEmail(false);
  };

  const createUserWithGoogle = async () => {
    setIsLoadingGoogle(true);
    try {
      const user = await signInWithGoogle(true);
      setUserData(user);
      navigate('/');
    } catch (error) {
      setErrorMessage(getSignUpErrorMessage(error));
    }
    setIsLoadingGoogle(false);
  };

  //TODO Include phone and country here
  const handleCountrySelection = (str: string) => {
    console.log(str);
  };

  const handlePhone = (e: string) => {
    console.log(e);
  };

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
        {errorMessage ? (
          <AuthErrorMessage
            message={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        ) : null}
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
        <div className="flex items-center gap-x-2 mb-4">
          <CountryCodeSelector handleChange={handleCountrySelection} />
          <input
            type="tel"
            name="tel"
            id="tel"
            className="border-b border-gray-400 bg-gray-100 p-3 text-xs w-full"
            placeholder="+8801 4454 4544"
            onChange={(e) => handlePhone(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-x-2 mb-4">
          <input
            type="text"
            placeholder="first name"
            className="bg-transparent w-full text-black border-b border-gray-400 px-2 py-1 focus:outline-none text-sm placeholder:text-black"
            ref={firstNameRef}
          />
          <input
            type="text"
            placeholder="last name"
            className="bg-transparent w-full text-black border-b border-gray-400 px-2 py-1 focus:outline-none text-sm placeholder:text-black"
            ref={lastNameRef}
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          className="bg-transparent w-full text-black border-b border-gray-400 mb-4 px-2 py-1 focus:outline-none text-sm placeholder:text-black"
          ref={emailRef}
        />
        <input
          type="Password"
          placeholder="Password"
          className="bg-transparent w-full text-black border-b border-gray-400 mb-4 px-2 py-1 focus:outline-none text-sm placeholder:text-black"
          ref={passwordRef}
        />
        <button
          className="text-white bg-black rounded-md w-full py-4 text-xs my-4"
          onClick={createAccount}
        >
          {isLoadingEmail ? (
            <FontAwesomeIcon icon={faCircleNotch} spin />
          ) : (
            'Create account'
          )}
        </button>
        <div className="h-[1px] bg-gray-300 relative my-7">
          <p className="text-xs center-absolutely bg-loginPageBg py-1 px-1">
            Or
          </p>
        </div>
        <div className="border flex rounded-md justify-center py-4 mt-5 cursor-pointer hover:border-gray-400 transition-all">
          <div className="flex" onClick={createUserWithGoogle}>
            <img
              src={Assets.Google}
              alt="Google"
              className={`h-6 w-6 mr-2 ${isLoadingGoogle ? 'spin' : ''}`}
            />
            <p>Sign up with Google</p>
          </div>
        </div>
        <p className="text-xs text-center absolute bottom-7 left-1/2 -translate-x-1/2">
          Already have an account?{' '}
          <Link className="font-semibold underline" to={'/login'}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
