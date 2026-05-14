import crypto from "crypto";

const PEPPER = process.env.PEPPER || "mi_pimienta_secreta";

export const generateSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

export const hashPassword = (password, salt) => {
  return crypto
    .pbkdf2Sync(password + PEPPER, salt, 100000, 64, "sha512")
    .toString("hex");
};

export const verifyPassword = (password, salt, storedHash) => {
  const hash = hashPassword(password, salt);
  return hash === storedHash;
};