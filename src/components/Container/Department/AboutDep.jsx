import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {Button} from "react-bootstrap";
import {Icon} from "@iconify/react";

import {
  getDeportById,
  getAllUpr,
  clearError,
} from "../../../store/departmentSlice";
import TokenService from "../../../services/token.service";

import Bread from "../Bread";
import Loader from "../../Present/Loader";
import DepInfo from "./DepInfo";
import ModalError from "../../Modals/ModalError";

const AboutDep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDeportById(process.env.REACT_APP_DEP_ID));
    dispatch(getAllUpr());
  }, [dispatch]);

  const handleEdit = () => {
    navigate(`/about/edit`);
  };
  const handleCreate = () => {
    navigate(`/contacts/create`);
  };

  const loading = useSelector((state) => state.department.loading);
  const error = useSelector((state) => state.department.error);
  const about = useSelector((state) => state.department.about);
  const visibleAdmin = TokenService.isHaveRole("ROLE_ADMIN");
  const visibleEditor = TokenService.isHaveRole("ROLE_EDITOR");

  let content = (
    <div>
      <Bread/>

      <div className="struct_dep_info">
        <DepInfo/>

        <div className="dep_blockAbout">
          {visibleAdmin || visibleEditor ? (
            <div>
              <Button variant="success" onClick={handleCreate}>
                Добавить
              </Button>
            </div>
          ) : null}
          <div className="dep_blockAbout_text">{about.text || null}</div>
        </div>
      </div>
    </div>
  );

  if (error.show)
    return (
      <ModalError
        show={error.show}
        errText={error.text}
        handleClose={() => {
          dispatch(clearError());
        }}
      />
    );
  if (loading) return <Loader/>;
  return content;
};

export default AboutDep;
