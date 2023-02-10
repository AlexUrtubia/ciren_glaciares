import { useState, useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import LoadingComponent from "./LoadingComponent";
import { Navigate } from "react-router-dom";

const ProtectedView = (props) => {
  const [fetching, setFetching] = useState(true);
  const { CheckLogIn, isLoggedIn } = useContext(AuthContext);
  const { children } = props;
  useEffect(() => {
    const Check = async() =>{
        setFetching(true);
        await CheckLogIn();
        setFetching(false);
    }
    Check()
    
  }, []);

  console.log("isloggedin:",isLoggedIn);
  return (
    <>
      {fetching && <LoadingComponent />}
      {!fetching && isLoggedIn && children}
      {!fetching && !isLoggedIn && <Navigate replace to="/login"/>}
    </>
  );
};

export default ProtectedView;
