// Validaciones y formatos de formularios (Perú).

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export const cleanPhone = (v) => v.replace(/[\s()-]/g, '').replace(/^\+?51/, '');
export const isPhone = (v) => /^9\d{8}$/.test(cleanPhone(v));

export const isDNI = (v) => /^\d{8}$/.test(v.trim());

export const isPasswordOk = (pw) => pw.length >= 8 && /[A-Za-z]/.test(pw) && /\d/.test(pw);

// 0 (muy débil) a 4 (fuerte)
export function passwordStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score += 1;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score += 1;
  if (/\d/.test(pw)) score += 1;
  if (/[^A-Za-z0-9]/.test(pw)) score += 1;
  return score;
}

// Tarjetas (solo demostración: el número nunca se guarda completo)
export function luhn(num) {
  const d = num.replace(/\D/g, '');
  if (d.length < 13) return false;
  let sum = 0;
  let alt = false;
  for (let i = d.length - 1; i >= 0; i -= 1) {
    let n = Number(d[i]);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

export function cardBrand(num) {
  const d = num.replace(/\D/g, '');
  if (/^4/.test(d)) return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(d)) return 'Mastercard';
  if (/^3[47]/.test(d)) return 'Amex';
  return 'Tarjeta';
}

export const formatCardNumber = (v) =>
  v
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();

export function formatExpiry(v) {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

export function isExpiryValid(v) {
  const m = /^(\d{2})\/(\d{2})$/.exec(v);
  if (!m) return false;
  const month = Number(m[1]);
  const year = 2000 + Number(m[2]);
  if (month < 1 || month > 12) return false;
  return new Date(year, month, 1) > new Date();
}