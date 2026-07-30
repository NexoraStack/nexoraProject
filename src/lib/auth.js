// Mock auth layer for this demo build: accounts live in localStorage and passwords
// are kept in plain text. That is acceptable here because there are no real users
// and no real data, but it must never ship as-is — a real app authenticates against
// a server and never stores credentials on the client.

const USERS_KEY = "nexora_users";
const SESSION_KEY = "nexora_session";

export const DEMO_CREDENTIALS = {
  email: "demo@nexora.com",
  password: "nexora123",
};

const DEMO_USER = {
  name: "Demo",
  email: DEMO_CREDENTIALS.email,
  password: DEMO_CREDENTIALS.password,
};

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  const users = raw ? JSON.parse(raw) : [];

  // Keep the demo account available so the credentials shown on the login screen
  // always work, even in a browser that has never seen this app before.
  if (!users.some((user) => user.email === DEMO_USER.email)) {
    users.push(DEMO_USER);
    writeUsers(users);
  }

  return users;
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function toSession({ name, email }) {
  return { name, email };
}

export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

function startSession(user) {
  const session = toSession(user);
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function login(email, password) {
  const users = readUsers();
  const user = users.find((candidate) => candidate.email === normalizeEmail(email));

  if (!user || user.password !== password) {
    return { success: false, error: "E-mail ou senha inválidos" };
  }

  return { success: true, session: startSession(user) };
}

export function signup({ name, email, password }) {
  const users = readUsers();
  const normalizedEmail = normalizeEmail(email);

  if (users.some((user) => user.email === normalizedEmail)) {
    return { success: false, error: "Já existe uma conta com este e-mail" };
  }

  const user = { name: name.trim(), email: normalizedEmail, password };
  writeUsers([...users, user]);

  return { success: true, session: startSession(user) };
}

export function updateProfile(currentEmail, { name, email }) {
  const users = readUsers();
  const index = users.findIndex((user) => user.email === normalizeEmail(currentEmail));

  if (index === -1) {
    return { success: false, error: "Conta não encontrada" };
  }

  const nextEmail = normalizeEmail(email);
  const takenByAnother = users.some(
    (user, i) => i !== index && user.email === nextEmail,
  );

  if (takenByAnother) {
    return { success: false, error: "Este e-mail já está em uso" };
  }

  const updated = { ...users[index], name: name.trim(), email: nextEmail };
  users[index] = updated;
  writeUsers(users);

  return { success: true, session: startSession(updated) };
}

export function changePassword(currentEmail, { currentPassword, newPassword }) {
  const users = readUsers();
  const index = users.findIndex((user) => user.email === normalizeEmail(currentEmail));

  if (index === -1) {
    return { success: false, error: "Conta não encontrada" };
  }
  if (users[index].password !== currentPassword) {
    return { success: false, error: "Senha atual incorreta" };
  }

  users[index] = { ...users[index], password: newPassword };
  writeUsers(users);

  return { success: true };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}
