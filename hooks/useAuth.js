import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { WEBCLIENTID } from "@env";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const config = {
  webClientId: WEBCLIENTID,
};
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [firebaseError, setFirebaseError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
      setInitialLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logOut = async () => {
    setLoading(true);
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await signOut(auth);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signinWithGoogle = async () => {
    try {
      const playServicesAvailable = await GoogleSignin.hasPlayServices();
      if (!playServicesAvailable) {
        setError("play services not available or outdated");
        return;
      }
      await GoogleSignin.configure(config);
      setLoading(true);
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo.user);

      const googleCredential = GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken
      );
      await signInWithCredential(auth, googleCredential);

      setError();
    } catch (error) {
      const errorMessage = getErrorMessage(error.code);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  function getErrorMessage(errorCode) {
    switch (errorCode) {
      case statusCodes.SIGN_IN_CANCELLED:
        return "sign in cancelled";
      case statusCodes.IN_PROGRESS:
        return "in progress";
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        return "play services not available";
      default:
        return errorCode.message || "unknown error";
    }
  }

  const memoValue = useMemo(
    () => ({
      user: userInfo,
      signinWithGoogle,
      logOut,
      loading,
      error,
      firebaseError,
    }),
    [userInfo, loading, error, firebaseError]
  );

  return (
    <AuthContext.Provider value={memoValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
