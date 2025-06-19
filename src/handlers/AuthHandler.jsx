//Filename: AuthHandler.jsx

export const loginUser = (username, password, users) => {
  if (!username || !password) return null;

  return users.find(
    (user) => user.username === username && user.password === password
  );
};