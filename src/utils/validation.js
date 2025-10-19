export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validatePassword = (password) =>
  /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
