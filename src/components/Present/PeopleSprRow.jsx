import {useState} from "react";
import {Icon} from "@iconify/react";
import {AnimatePresence, motion} from "framer-motion";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import TokenService from "../../services/token.service";

const containerAnim = {
  default: {
    height: 0,
  },
  collapsed: {
    height: "auto",
    transition: {
      when: "beforeChildren",
      duration: 0.2,
    },
  },
  exit: {
    height: "0",
    transition: {
      when: "afterChildren",
      duration: 0.2,
    },
  },
};
const anim = {
  default: {opacity: 0, scale: 0.8},
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

const PeopleSprRow = ({people}) => {
  const id = useSelector((state) => state.department.idDep);
  const visibleAdmin = TokenService.isHaveRole("ROLE_ADMIN");
  const visibleEditor = TokenService.isHaveRole("ROLE_EDITOR");

  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  return (
    <li key={people.id}>
      {people.users && people.users.map((user, index) => (
        <div
          key={index}
          className={`${
            expandedId === user.id
              ? "struct_dep_peoples_row_open"
              : "struct_dep_peoples_row_close"
          } struct_dep_peoples_row`}
          onClick={() => setExpandedId(expandedId === user.id ? null : user.id)}
        >
          <div className="struct_dep_peoples_row_card">
            {expandedId === user.id ? (
              <div>
                <Icon
                  icon="ic:baseline-minus"
                  className="struct_dep_peoples_row_card_img"
                />
              </div>
            ) : (
              <div>
                <Icon
                  icon="ic:baseline-plus"
                  className="struct_dep_peoples_row_card_img"
                />
              </div>
            )}
            <div>
              <div className="struct_dep_peoples_row_card_post">
                {user.position}
              </div>
              <div className="struct_dep_peoples_row_card_fio">{user.name}</div>
            </div>
          </div>

          {user.description && (
            <div className="struct_dep_peoples_row_card_abs">
              Вопросы по которым можно обращаться:{" "}
              <span>
                {user.description}
              </span>
            </div>
          )}

          <AnimatePresence initial={false}>
            {expandedId === user.id && (
              <motion.div
                className="struct_dep_peoples_row_card_info"
                variants={containerAnim}
                initial="default"
                animate="collapsed"
                exit="exit"
              >
                <motion.div variants={anim}>
                  <span className="struct_dep_peoples_row_card_info_header">
                    Телефон:
                  </span>
                  <div className="struct_dep_peoples_row_card_info_tel">
                    {user.phone && <div>{user.phone}</div>}
                  </div>
                  {visibleAdmin || visibleEditor ?
                    <Button variant="success"
                            onClick={() => navigate(`/employee/${id}/${user.id}/edit`)} style={{
                      backgroundColor: "rgb(86, 162, 182)",
                      border: "none",
                    }}>Редактировать</Button> :
                    null}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </li>
  );
};


export default PeopleSprRow;

