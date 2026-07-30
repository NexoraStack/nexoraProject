const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_PASSWORD_LENGTH = 8;

export function isRequired(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function isValidEmail(value) {
  return EMAIL_REGEX.test(value);
}

export function isLongEnough(value, min = MIN_PASSWORD_LENGTH) {
  return typeof value === "string" && value.length >= min;
}

export function matches(value, confirmation) {
  return value === confirmation;
}
