import instance from "./http.service";
import TokenService from "./token.service";

class AuthService {
  login({username, password}) {
    return instance
      .post("/login", {tbn: username, password, site: "fed"})
      .then((response) => {
        TokenService.setAccessToken(response.data.token);
        TokenService.setUser(atob(response.data.token.split(".")[1]));
      })
      .catch((err) => alert(err.message));
  }

  logout() {
    TokenService.removeUser();
    TokenService.removeAccessToken();
  }
}

export default new AuthService();
