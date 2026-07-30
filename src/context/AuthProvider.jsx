import { useState } from "react";
import * as auth from "../lib/auth";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => auth.getSession());

  function applyResult(result) {
    if (result.success && result.session) setSession(result.session);
    return result;
  }

  function login(email, password) {
    return applyResult(auth.login(email, password));
  }

  function signup(fields) {
    return applyResult(auth.signup(fields));
  }

  function updateProfile(fields) {
    return applyResult(auth.updateProfile(session.email, fields));
  }

  function changePassword(fields) {
    return auth.changePassword(session.email, fields);
  }

  function logout() {
    auth.logout();
    setSession(null);
  }

  return (
    <AuthContext.Provider
      value={{ session, login, signup, updateProfile, changePassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
