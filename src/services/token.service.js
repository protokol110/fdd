const setAccessToken = (token) => {
  localStorage.setItem(`token-${process.env.REACT_APP_SITE_NAME}`, token);
};

const getAccessToken = () => {
  return localStorage.getItem(`token-${process.env.REACT_APP_SITE_NAME}`);
};

const removeAccessToken = () => {
  return localStorage.removeItem(`token-${process.env.REACT_APP_SITE_NAME}`);
};

const setUser = (user) => {
  localStorage.setItem(`user-${process.env.REACT_APP_SITE_NAME}`, user);
};

const getUser = () => {
  const user = JSON.parse(
    localStorage.getItem(`user-${process.env.REACT_APP_SITE_NAME}`)
  );

  if (user === null) {
    return null;
  }

  if (user.exp * 1000 > Date.now()) {
    return user;
  } else {
    removeUser();
    removeAccessToken();
    return null;
  }
};

const removeUser = () => {
  return localStorage.removeItem(`user-${process.env.REACT_APP_SITE_NAME}`);
};

const getUserRoles = () => {
  return getUser()?.authorities;
};

const isHaveRole = (roleName) => {
  const role = getUserRoles()?.find((role) => role.authority === roleName);
  return role !== undefined;
};

const TokenService = {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  setUser,
  getUser,
  removeUser,
  getUserRoles,
  isHaveRole,
};

export default TokenService;
