import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  user: "",
  admin: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const LogOut = async () => {
    fetch("http://localhost:3081/api/v1/auth/signout", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept",
      },
      credentials: "include",
    })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  const loginHandler = (user, admin) => {
    setUser(user);
    setAdmin(admin);
    //setLoggedIn(true);
    console.log(user);
    console.log(admin);
    console.log("correctly logged in");
  };

  //Check if user is logged
  const CheckLogIn = async () => {
    await fetch("http://localhost:3081/api/v1/auth/signed", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept",
      },
      credentials: "include",
    })
      .then((response) => {
        console.log(response);
        if (response.ok){
          setLoggedIn(true);
          return response.json();
        }
        else{
          return false
        }
        
      }).then(data => {
        loginHandler(data.payload.firstName, data.payload.sudo)
        return true
      } )
      .catch((err) => {
        return false;
      });
  };

  const logoutHandler = () => {
    setUser(null);
    setAdmin(false);
    setLoggedIn(false);
    LogOut()
    console.log("correctly logged off");
  };

  const contextValue = {
    user: user,
    admin: admin,
    isLoggedIn: loggedIn,
    login: loginHandler,
    logout: logoutHandler,
    CheckLogIn : CheckLogIn,
    isLoading: isLoading,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
