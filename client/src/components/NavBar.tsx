// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <div onClick={() => loginWithRedirect({})}>Logar</div>
      )}

      {isAuthenticated && <div onClick={() => logout()}>Sair</div>}
    </div>
  );
};

export default NavBar;