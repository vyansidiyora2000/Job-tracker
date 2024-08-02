import { useContext, useEffect, useState } from "react";
import { Accountcontext } from "../context/Account";
import { CognitoUserSession } from "amazon-cognito-identity-js";

const Status = ({}) => {
  const [status, setStatus] = useState<boolean>(false);
  const { getSession, logout } = useContext(Accountcontext) as {
    getSession: () => Promise<CognitoUserSession>;
    logout: () => void;
  };

  useEffect(() => {
    getSession()
      .then((session) => {
        console.log("Session:", session);
        setStatus(true);
      })
      .catch((error) => {
        console.error("Error fetching session:", error);
      });
  }, [getSession]);

  return (
    <div>
      {status ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <p>Please login again.</p>
      )}
    </div>
  );
};

export default Status;
