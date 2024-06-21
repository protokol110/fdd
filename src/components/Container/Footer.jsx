import {useEffect} from "react";
import {Button, Image} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import LogoAsb from "../../assets/logo/footer_asb_logo.png";
import LogoLogin from "../../assets/logo/footer_login.png";
import authService from "../../services/auth.service";
import TokenService from "../../services/token.service";

const Footer = () => {
  const navigate = useNavigate();

  const clearStorageJWT = () => {
    authService.logout();
    navigate(`/auth`);
  };

  const token = TokenService.getAccessToken();
  const user = TokenService.getUser();

  useEffect(() => {
    TokenService.getUser();
  }, []);

  return (
    <div className="footer">
      <div className="footer_block">
        <div className="footer_asb_text">
          <span> © 2024, ОАО "АСБ Беларусбанк" Минск, Беларусь</span>
        </div>

        <a
          href="http://lotus.asb.by/"
          className="footer_asb_inform"
          target="_blank"
          rel="noreferrer"
        >
          <Image className="mx-3" src={LogoAsb}/>
          Информационные ресурсы
        </a>

        <div className="footer_login">
          {!token ? (
            <Link to={"/auth"}>
              <Image className="mx-2" src={LogoLogin}/>

              <Button
                variant="success"
                className="mx-2 footer_button"
                type="submit"
              >
                Авторизация
              </Button>
            </Link>
          ) : null}

          {token ? (
            <div className="footer_login_exit">
              <span className="footer_login_exit_text">{user?.sub}</span>
              <Button
                variant="success"
                className="mx-2 footer_button"
                type="submit"
                onClick={clearStorageJWT}
              >
                Выйти
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Footer;
