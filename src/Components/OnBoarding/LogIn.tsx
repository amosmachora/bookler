import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Assets } from '../../Assets/Assets';
import { isLinkClickable } from '../../Util/Helpers';
import { useAuth } from '../../Hooks/useAuth';
import {
  getSignInErrorMessage,
  signInWithEmailAndPassword,
  signInWithGoogle,
} from '../../firebase';
import { AuthErrorMessage } from '../AuthErrorMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const LogIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rememberForThirtyDays, setRememberForThirtyDays] =
    useState<boolean>(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const navigate = useNavigate();
  const isClickable = isLinkClickable(email, password);

  const { setUserData } = useAuth();

  const handleLogin = async () => {
    setIsLoadingEmail(true);
    try {
      const user = await signInWithEmailAndPassword(email, password);
      setUserData(user);
      navigate('/');
    } catch (error) {
      setErrorMessage(getSignInErrorMessage(error));
    }
    setIsLoadingEmail(false);
  };

  const googleSignIn = async () => {
    setIsLoadingGoogle(true);
    try {
      const user = await signInWithGoogle(false);
      setUserData(user);
      navigate('/');
    } catch (error) {
      setErrorMessage(getSignInErrorMessage(error));
    }
    setIsLoadingEmail(false);
  };

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
        <div className="mt-[12%]">
          <p className="font-bold text-3xl">Welcome back, User</p>
          <p className="text-sm">Welcome back! Please enter your details.</p>
        </div>
        <div className="border flex rounded-md justify-center py-4 mt-[5%] cursor-pointer hover:border-gray-400 transition-all">
          <div className="flex" onClick={googleSignIn}>
            <img
              src={Assets.Google}
              alt="Google"
              className={`h-6 w-6 mr-2 ${isLoadingGoogle ? 'spin' : ''}`}
            />
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
              checked
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
          {isLoadingEmail ? (
            <FontAwesomeIcon icon={faCircleNotch} spin />
          ) : (
            'Log in'
          )}
        </button>
        <p className="text-xs text-center mt-4 absolute bottom-7 left-1/2 -translate-x-1/2">
          Don’t have an account?{' '}
          <Link className="font-semibold underline" to={'/onboarding'}>
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
