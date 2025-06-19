// Filename: ErrorHandler.jsx

export const getLoginErrorMessage = (username, password) => {
  if (!username && !password) {
    return ['error kode 1', 'error kode 2'];
  } else if (!username) {
    return ['error kode 1'];
  } else if (!password) {
    return ['error kode 2'];
  }

  return ['error kode 3'];
};