import { read, write } from './Storage';

const USERS_KEY = 'sara:users';
const SESSION_KEY = 'sara:session';
const RESET_KEY = 'sara:resetTokens';

const newId = () =>
  window.crypto?.randomUUID?.() ?? `u-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const normalizeEmail = (email: any) => email.trim().toLowerCase();
const toPublic = ({ passwordHash, ...user }) => user;

async function hash(password: any) {
  const text = `sara-demo:${password}`;
  if (window.crypto?.subtle) {
    const buf = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  return window.btoa(unescape(encodeURIComponent(text)));
}

const getUsers = () => read(USERS_KEY, []);
const saveUsers = (users: any) => write(USERS_KEY, users);

// ----- Sesión (localStorage si "Recordarme", si no sessionStorage) -----
export function getSessionUserId() {
  try {
    return window.localStorage.getItem(SESSION_KEY) ?? window.sessionStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

function setSession(userId: any, remember: any) {
  try {
    window.localStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(SESSION_KEY);
    (remember ? window.localStorage : window.sessionStorage).setItem(SESSION_KEY, userId);
  } catch {
    /* ignorar */
  }
}

export function clearSession() {
  try {
    window.localStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignorar */
  }
}

export function getSessionUser() {
  const id = getSessionUserId();
  const user = id ? getUsers().find((u: any) => u.id === id) : null;
  return user ? toPublic(user) : null;
}

// ----- Registro / acceso -----
export async function register({ name, lastName, email, phone, password }) {
  const users = getUsers();
  const mail = normalizeEmail(email);
  if (users.some((u: any) => u.email === mail)) {
    return { ok: false, field: 'email', error: 'Ya existe una cuenta con este correo.' };
  }
  const user = {
    id: newId(),
    name: name.trim(),
    lastName: (lastName ?? '').trim(),
    email: mail,
    phone: phone.trim(),
    doc: '',
    passwordHash: await hash(password),
    addresses: [],
    prefs: { sizes: [], notifyEmail: true, notifyWhatsapp: false },
    createdAt: new Date().toISOString(),
  };
  saveUsers([...users, user]);
  setSession(user.id, true);
  return { ok: true, user: toPublic(user) };
}

export async function login({ email, password, remember }) {
  const user = getUsers().find((u: any) => u.email === normalizeEmail(email));
  if (!user || user.passwordHash !== (await hash(password))) {
    return { ok: false, error: 'Correo o contraseña incorrectos.' };
  }
  setSession(user.id, Boolean(remember));
  return { ok: true, user: toPublic(user) };
}

// ----- Perfil -----
export async function updateUser(id, patch) {
  const users = getUsers();
  const current = users.find((u: any) => u.id === id);
  if (!current) return { ok: false, error: 'Usuario no encontrado.' };

  if (patch.email !== undefined) {
    const mail = normalizeEmail(patch.email);
    if (users.some((u: any) => u.id !== id && u.email === mail)) {
      return { ok: false, field: 'email', error: 'Ese correo ya está en uso por otra cuenta.' };
    }
    patch = { ...patch, email: mail };
  }
  const updated = { ...current, ...patch };
  saveUsers(users.map((u: any) => (u.id === id ? updated : u)));
  return { ok: true, user: toPublic(updated) };
}

export async function changePassword(id, currentPassword, nextPassword) {
  const users = getUsers();
  const current = users.find((u: any) => u.id === id);
  if (!current) return { ok: false, error: 'Usuario no encontrado.' };
  if (current.passwordHash !== (await hash(currentPassword))) {
    return { ok: false, field: 'current', error: 'La contraseña actual no es correcta.' };
  }
  const passwordHash = await hash(nextPassword);
  saveUsers(users.map((u: any) => (u.id === id ? { ...u, passwordHash } : u)));
  return { ok: true };
}

export async function deleteUser(id: any) {
  saveUsers(getUsers().filter((u: any) => u.id !== id));
  clearSession();
  return { ok: true };
}

// ----- Recuperar contraseña (simulado) -----
// Devuelve el token solo para poder mostrar el enlace en la demo;
// en producción se envía por correo y nunca se muestra en pantalla.
export async function requestReset(email: any) {
  const user = getUsers().find((u: any) => u.email === normalizeEmail(email));
  if (!user) return { ok: true, token: null };
  const token = newId().replace(/-/g, '');
  const tokens = read(RESET_KEY, []).filter((t) => t.expires > Date.now());
  write(RESET_KEY, [...tokens, { token, userId: user.id, expires: Date.now() + 30 * 60 * 1000 }]);
  return { ok: true, token };
}

export function isResetTokenValid(token: any) {
  return read(RESET_KEY, []).some((t) => t.token === token && t.expires > Date.now());
}

export async function resetPassword(token: any, password: any) {
  const tokens = read(RESET_KEY, []);
  const entry = tokens.find((t: any) => t.token === token && t.expires > Date.now());
  if (!entry) return { ok: false, error: 'El enlace no es válido o ya venció.' };
  const passwordHash = await hash(password);
  saveUsers(getUsers().map((u: any) => (u.id === entry.userId ? { ...u, passwordHash } : u)));
  write(
    RESET_KEY,
    tokens.filter((t: any) => t.token !== token)
  );
  return { ok: true };
}