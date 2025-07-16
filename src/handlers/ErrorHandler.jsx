// Filename: ErrorHandler.jsx

export const getLoginErrorMessage = (code) => {
  if (Array.isArray(code)) return code;

  if (code === 'FIELD_REQUIRED') {
    return ['error kode 1', 'error kode 2'];
  } else if (code === 'USERNAME_REQUIRED') {
    return ['error kode 1'];
  } else if (code === 'PASSWORD_REQUIRED') {
    return ['error kode 2'];
  } else if (code === 'AUTH_FAILED') {
    return ['error kode 3'];
  } else {
    return [code];
  }
};