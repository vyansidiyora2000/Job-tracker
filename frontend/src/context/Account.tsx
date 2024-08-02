import React, { createContext, ReactNode } from "react";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import UserPool from "../utils/UserPool";


export interface AccountContextType {
  authenticate: (email: string, password: string) => Promise<void>;
  getSession: () => Promise<CognitoUserSession>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  confirmPassword: (
    email: string,
    code: string,
    newPassword: string
  ) => Promise<void>;
}
const Accountcontext = createContext<AccountContextType>({
  authenticate: async () => {},
  getSession: async () => { throw new Error('Session not implemented'); },
  logout: () => {},
  forgotPassword: async () => {},
  confirmPassword: async () => {}
});

const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const authenticate = async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess:", data);
          resolve();
        },
        onFailure: (err) => {
          console.error("onFailure:", err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired:", data);
          resolve();
        },
      });
    });
  };

  const getSession = async () => {
    return new Promise<CognitoUserSession>((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession(
          (
            err: any,
            session: CognitoUserSession | PromiseLike<CognitoUserSession>
          ) => {
            if (err) {
              reject(err);
            } else if (session) {
              resolve(session);
            } else {
              reject(new Error("Session not found"));
            }
          }
        );
      } else {
        reject(new Error("User not found"));
      }
    });
  };

  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  const forgotPassword = async (email: string) => {
    return new Promise<void>((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      user.forgotPassword({
        onSuccess: () => {
          console.log("Code sent successfully");
          resolve();
        },
        onFailure: (err) => {
          console.error("Error in sending code:", err);
          reject(err);
        },
      });
    });
  };

  const confirmPassword = async (
    email: string,
    code: string,
    newPassword: string
  ) => {
    return new Promise<void>((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      user.confirmPassword(code, newPassword, {
        onSuccess: () => {
          console.log("Password reset successfully");
          resolve();
        },
        onFailure: (err) => {
          console.error("Error in resetting password:", err);
          reject(err);
        },
      });
    });
  };

  return (
    <Accountcontext.Provider
      value={{
        authenticate,
        getSession,
        logout,
        forgotPassword,
        confirmPassword,
    
      }}
    >
      {children}
    </Accountcontext.Provider>
  );
};

export { AccountProvider, Accountcontext };
