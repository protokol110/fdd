import {Link} from "react-router-dom";
import './linkRow.css';
import TokenService from "../../../services/token.service";

const LinkRow = ({link}) => {

  const hasRole = (role) => TokenService.isHaveRole(role);
  const visibleAdmin = hasRole("ROLE_ADMIN");
  const visibleEditor = hasRole("ROLE_EDITOR");

  return (
    <div className="link_row">
      <div className="link_row_name">{link.name}</div>
      <div className="link_row_body">
        <a href={link.description}>{link.description}</a>
        <span>   </span>
        {(visibleAdmin || visibleEditor) && (
          <Link to={`/links/edit/${link.id}`} className="link_row_body_adv">
            Изменить
          </Link>
        )}
      </div>
    </div>
  );
};

export default LinkRow;
