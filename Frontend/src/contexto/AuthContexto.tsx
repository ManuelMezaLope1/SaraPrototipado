import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import * as auth from '../servicios/AuthServicio';

// Sesión y perfil del cliente. Usa authService (localStorage simulado).
const AuthContexto = createContext(null);

interface Children{
    children: any;
}

export function AuthProvider({ children }: Children) {
  const [user, setUser] = useState(() => auth.getSessionUser());

  const register = useCallback(async (data: any) => {
    const res = await auth.register(data);
    if (res.ok) setUser(res.user);
    return res;
  }, []);

  const login = useCallback(async (data: any) => {
    const res = await auth.login(data);
    if (res.ok) setUser(res.user);
    return res;
  }, []);

  const logout = useCallback(() => {
    auth.clearSession();
    setUser(null);
  }, []);

  const updateUser = useCallback(
    async (patch: any) => {
      if (!user) return { ok: false, error: 'No hay sesión activa.' };
      const res = await auth.updateUser(user.id, patch);
      if (res.ok) setUser(res.user);
      return res;
    },
    [user]
  );

  const changePassword = useCallback(
    (current: any, next: any) => (user ? auth.changePassword(user.id, current, next) : Promise.resolve({ ok: false })),
    [user]
  );

  const deleteAccount = useCallback(async () => {
    if (!user) return;
    await auth.deleteUser(user.id);
    setUser(null);
  }, [user]);

  // ----- Direcciones guardadas -----
  const saveAddress = useCallback(
    (address: any) => {
      if (!user) return Promise.resolve({ ok: false });
      const list = user.addresses ?? [];
      const id = address.id ?? `a-${Date.now()}`;
      const makeDefault = Boolean(address.isDefault) || list.length === 0;
      const entry = { ...address, id, isDefault: makeDefault };
      const base = list.map((a: any) => (makeDefault ? { ...a, isDefault: false } : a));
      const next = base.some((a: any) => a.id === id)
        ? base.map((a: any) => (a.id === id ? entry : a))
        : [...base, entry];
      if (!next.some((a: any) => a.isDefault)) next[0] = { ...next[0], isDefault: true };
      return updateUser({ addresses: next });
    },
    [user, updateUser]
  );

  const removeAddress = useCallback(
    (id: any) => {
      const next = (user?.addresses ?? []).filter((a: any) => a.id !== id);
      if (next.length > 0 && !next.some((a: any) => a.isDefault)) next[0] = { ...next[0], isDefault: true };
      return updateUser({ addresses: next });
    },
    [user, updateUser]
  );

  const setDefaultAddress = useCallback(
    (id: any) =>
      updateUser({
        addresses: (user?.addresses ?? []).map((a: any) => ({ ...a, isDefault: a.id === id })),
      }),
    [user, updateUser]
  );

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      register,
      login,
      logout,
      updateUser,
      changePassword,
      deleteAccount,
      saveAddress,
      removeAddress,
      setDefaultAddress,
      requestReset: auth.requestReset,
      resetPassword: auth.resetPassword,
      isResetTokenValid: auth.isResetTokenValid,
    }),
    [
      user,
      register,
      login,
      logout,
      updateUser,
      changePassword,
      deleteAccount,
      saveAddress,
      removeAddress,
      setDefaultAddress,
    ]
  );

  return <AuthContexto.Provider value={value}>{children}</AuthContexto.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContexto);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}