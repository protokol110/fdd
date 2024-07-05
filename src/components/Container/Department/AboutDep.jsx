import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {Button} from "react-bootstrap";

import {
  getAllUpr,
  clearError,
  selectDepartment
} from "../../../store/departmentSlice";
import TokenService from "../../../services/token.service";

import Bread from "../Bread";
import Loader from "../../Present/Loader";
import DepInfo from "./DepInfo";
import ModalError from "../../Modals/ModalError";

const AboutDep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedDepartment = useSelector((state) => state.department.selectedDepartment);

  useEffect(() => {

    dispatch(getAllUpr());
  }, [dispatch]);

  const handleCreate = () => {
    dispatch(selectDepartment(""));
    navigate(`/contacts/create`);
  };

  const loading = useSelector((state) => state.department.loading);
  const error = useSelector((state) => state.department.error);
  const visibleAdmin = TokenService.isHaveRole("ROLE_ADMIN");
  const visibleEditor = TokenService.isHaveRole("ROLE_EDITOR");

  let content = (
    <div>
      <Bread/>

      <div className="struct_dep_info">
        <DepInfo/>

        <div className="dep_blockAbout">
          {(visibleAdmin || visibleEditor) && selectedDepartment === "cybersecurity" ? (
            <div>
              <Button variant="success" onClick={handleCreate}>
                Добавить департамент
              </Button>
            </div>
          ) : null}
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
