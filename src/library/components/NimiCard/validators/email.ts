const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

/**
 * Checks if a value is a valid Discord username
 * @param value
 * @returns
 */
export function isEmail(mail) {
  return EMAIL_PATTERN.test(mail);
}
