/* eslint-disable react/prop-types */
import { createContext, useState } from "react";


export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [ isLogin, setIsLogin ] = useState(true);
  const [ isAuth, setIsAuth ] = useState(null);

  const toggleLogin = () => setIsLogin(p => !p);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        toggleLogin,
        isAuth,
        setIsAuth,
      }}
      >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;