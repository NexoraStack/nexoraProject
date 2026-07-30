import { createContext, useContext, useState } from "react";
import * as auth from "../lib/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => auth.getSession());

  function login(email, password) {
    const result = auth.login(email, password);
    if (result.success) setSession(result.session);
    return result;
  }

  function logout() {
    auth.logout();
    setSession(null);
  }

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
