const SESSION_KEY = "nexora_session";

export const DEMO_CREDENTIALS = {
  email: "demo@nexora.com",
  password: "nexora123",
};

export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function login(email, password) {
  if (
    email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
    password === DEMO_CREDENTIALS.password
  ) {
    const session = { email, name: email.split("@")[0] };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true, session };
  }

  return { success: false, error: "E-mail ou senha inválidos" };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}
