import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  UserCredential,
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword as createUserWithEmailFnFromFirebase,
  signInWithEmailAndPassword as signInUserFnFromFirebase,
} from 'firebase/auth';
import { User } from './Hooks/useAuth';

const firebaseConfig = {
  apiKey: 'AIzaSyC36qCIxLFkUUrp3xYZcglOBIlflnYNkaY',
  authDomain: 'bookler-d6ff7.firebaseapp.com',
  projectId: 'bookler-d6ff7',
  storageBucket: 'bookler-d6ff7.appspot.com',
  messagingSenderId: '167584013814',
  appId: '1:167584013814:web:8d8caf8a7905d5404cfbd7',
  measurementId: 'G-ZR8PV89H5R',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const analytics = getAnalytics(firebaseApp);
export const db = getFirestore(firebaseApp);
const googleAuthProvider = new GoogleAuthProvider();

/**
 * A function to sign in or create a new user using google firebase.
 * @param firstTimeUser a flag indicating that it is a first time user
 */
export const signInWithGoogle = async (
  firstTimeUser: boolean
): Promise<User> => {
  if (window.innerWidth < 768) {
    try {
      const userCredential: UserCredential = await signInWithRedirect(
        auth,
        googleAuthProvider
      );
      const user = {
        id: userCredential.user.uid,
        email: userCredential.user.email!,
        name: userCredential.user.displayName ?? userCredential.user.email!,
        paymentMethodSelected: false,
        plan: 'basic',
        picture: userCredential.user.photoURL!,
      };

      if (firstTimeUser) {
        addNewUserToDB(user);
      } else {
        //TODO fetch and return saved user from DB
      }
      return user;
    } catch (err) {
      throw err;
    }
  } else {
    try {
      const UserCredential: UserCredential = await signInWithPopup(
        auth,
        googleAuthProvider
      );
      const user = {
        id: UserCredential.user.uid,
        email: UserCredential.user.email!,
        name: UserCredential.user.displayName ?? UserCredential.user.email!,
        paymentMethodSelected: false,
        plan: 'basic',
        picture: UserCredential.user.photoURL!,
      };
      if (firstTimeUser) {
        addNewUserToDB(user);
      } else {
        //TODO fetch and return saved user from DB
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
};

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const user = await signInUserFnFromFirebase(auth, email, password);
    //TODO fetch saved user from DB
    return {
      id: user.user.uid,
      email: user.user.email!,
      name: user.user.displayName ?? user.user.email!,
      picture: user.user.photoURL,
    };
  } catch (err) {
    throw err;
  }
};

/**
 * a function to create a user with email and password
 * @param email the email of the new user
 * @param password the string representation of the user`s password
 * @param name a name object containing a firstName and lastName property
 * @returns a promise of a user object
 */
export const createUserWithEmailAndPassword = async (
  email: string,
  password: string,
  name: { firstName: string; lastName: string }
): Promise<User> => {
  try {
    const userCredential: UserCredential =
      await createUserWithEmailFnFromFirebase(auth, email, password);
    const newUser: User = {
      id: userCredential.user.uid,
      email: userCredential.user.email!,
      name:
        userCredential.user.displayName ?? name.firstName + ' ' + name.lastName,
      picture: userCredential.user.photoURL,
    };
    addNewUserToDB(newUser);
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const redirectResult = async (): Promise<User | null> => {
  try {
    const userCredential: UserCredential | null = await getRedirectResult(auth);
    if (userCredential) {
      const newUser: User = {
        id: userCredential.user.uid,
        email: userCredential.user.email!,
        name: userCredential.user.displayName ?? userCredential.user.email!,
        picture: userCredential.user.photoURL!,
      };
      addNewUserToDB(newUser);
      return newUser;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const addNewUserToDB = async (user: User) => {
  const usersRef = doc(db, 'users', user.id);
  await setDoc(usersRef, user, {
    merge: true,
  });
};

export const getSignInErrorMessage = (err: any): string => {
  let errorMessage: string;
  switch (err.code) {
    case 'auth/user-not-found':
      errorMessage = 'User not found. Please check your email and try again.';
      break;
    case 'auth/wrong-password':
      errorMessage =
        'Wrong password. Please check your password and try again.';
      break;
    case 'auth/network-request-failed':
      errorMessage =
        'Network error. Please check your internet connection and try again.';
      break;
    case 'auth/popup-closed-by-user':
      errorMessage = 'Sign in failed: You closed the sign-in window.';
      break;
    case 'auth/cancelled-popup-request':
      errorMessage = 'Sign in failed: You cancelled the sign-in window.';
      break;
    case 'auth/email-already-in-use':
      errorMessage =
        'This email is already in use. Please sign in or use a different email address.';
      break;
    case 'auth/operation-not-allowed':
      errorMessage =
        'Sign in is currently not available. Please try again later.';
      break;
    case 'auth/too-many-requests':
      errorMessage =
        'Sign in has been temporarily disabled due to too many requests. Please try again later.';
      break;
    case 'auth/internal-error':
      errorMessage = 'An internal error has occurred. Please try again later.';
      break;
    default:
      errorMessage = err.message;
  }
  return errorMessage;
};

export const getSignUpErrorMessage = (error: any): string => {
  if (error.code === 'auth/account-exists-with-different-credential') {
    return 'An account with this email already exists. Try signing in with a different method.';
  } else if (error.code === 'auth/popup-closed-by-user') {
    return 'The sign-up popup was closed before authentication could complete. Please try again.';
  } else if (error.code === 'auth/cancelled-popup-request') {
    return 'The sign-up popup was cancelled before authentication could complete. Please try again.';
  } else if (error.code === 'auth/email-already-in-use') {
    return 'An account with this email already exists. Please use a different email address.';
  } else if (error.code === 'auth/invalid-email') {
    return 'The email address you entered is not valid. Please check your email and try again.';
  } else if (error.code === 'auth/weak-password') {
    return 'Your password is too weak. Please choose a stronger password.';
  } else {
    return 'An error occurred. Please try again later. ' + error.code;
  }
};
