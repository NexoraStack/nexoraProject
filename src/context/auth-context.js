import { createContext, useContext } from "react";

// Context + hook live here, with no component exports, so React Fast Refresh keeps
// working for the provider in AuthProvider.jsx. Kebab-case filename on purpose: a
// sibling named `authContext.js` would collide with `AuthContext.jsx` on
// case-insensitive filesystems and resolve to the wrong module.
export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}
