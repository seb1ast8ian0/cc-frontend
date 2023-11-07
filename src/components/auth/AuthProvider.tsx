import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession } from "amazon-cognito-identity-js";
import React, { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {cognitoSignin, cognitoSignup, cognitoVerifyUser, cognitoResendCode} from './CognitoAuth'
import { LoginCredentials, SignupCredentials } from "./AuthCredentialsInterfaces";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = React.createContext<any>(null);

const useAuth = () => {
    return React.useContext(AuthContext);
};

const AuthProvider = (props: AuthProviderProps) => {

  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = React.useState<string|null>(localStorage.getItem('token') || null);

  const handleLogin = async (credentials: LoginCredentials) => {

    console.log("handleLogin", credentials);

    return new Promise(async (resolve, reject) => {

      const token = cognitoSignin(credentials.username, credentials.password);

      token.then(
        (token) => {

          setToken(token);
          localStorage.setItem('token', token);

          resolve(null);
          
          const origin = location.state?.from?.pathname || '/';
          navigate(origin);


      })
      .catch((error) => {

        reject(error);
        console.error('Authentifizierungsfehler:', error);

      })
      
    });
    
  };

  const handleResendVerification = async (username: string) => {
    console.log("resendVerification", username);

    return new Promise(async (resolve, reject) => {
      cognitoResendCode(username)
      .then(
        () => resolve(null)
      )
      .catch((error) => {
        console.error('Fehler beim Neusenden des Codes:', error);
        reject(error);
      })
    });

  }

  const handleVerification = async (cognitoUsername: string, verificationCode: number) => {

    return new Promise(async (resolve, reject) => {
      cognitoVerifyUser(cognitoUsername, verificationCode.toString()).then(() => {
        resolve(null);
      })
      .catch((error) => {
        reject(error);
      })
    });

  }

  const handleSignup = async (credentials: SignupCredentials) => {

      console.log('handleSignup', credentials);

      return new Promise<CognitoUser>(async (resolve, reject) => {
        cognitoSignup(credentials).then((user) => {
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        })
      });

  }

  const handleLogout = () => {

      console.log("handleLogout");

      setToken(null);
      localStorage.removeItem('token');

      navigate("/auth/login");

  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onSignup : handleSignup,
    onVerification: handleVerification,
    onResendVerification: handleResendVerification
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
