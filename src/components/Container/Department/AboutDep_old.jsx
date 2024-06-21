import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllUpr,
  getDeportById,
  clearError,
} from "../../../store/departmentSlice";
import Loader from "../../Present/Loader";
import LogoDep from "./LogoDep";
import { Icon } from "@iconify/react";
import TokenService from "../../../services/token.service";
import ModalError from "../../Modals/ModalError";

const AboutDep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDeportById(process.env.REACT_APP_DEP_ID));
    dispatch(getAllUpr());
  }, [dispatch]);

  const { uprs, about, loading, error } = useSelector((state) => state.department);
  const visibleAdmin = TokenService.isHaveRole("ROLE_ADMIN");
  const visibleEditor = TokenService.isHaveRole("ROLE_EDITOR");

  const handleEdit = () => {
    navigate(`/about/edit`);
  };

  const renderLogoDep = () => {
    return uprs?.map((upr) => <LogoDep key={upr.id} upr={upr} />);
  };

  const renderEditButton = () => {
    return (visibleAdmin || visibleEditor) ? (
      <div>
        <Button variant="success" onClick={handleEdit}>
          <Icon icon="ph:pencil-fill" /> Редактировать
        </Button>
      </div>
    ) : null;
  };

  if (error.show) {
    return (
      <ModalError
        show={error.show}
        errText={error.text}
        handleClose={() => {
          dispatch(clearError());
        }}
      />
    );
  }

  if (loading) return <Loader />;

  return (
    <>
      <div className="logoDep_block mb-3">
        {renderLogoDep()}
      </div>

      <div className="dep_blockAbout">
        <div className="dep_blockAbout_text">{about.text || null}</div>
        {renderEditButton()}
      </div>
    </>
  );
};

export default AboutDep;
