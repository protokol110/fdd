import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {
  getAllUpr,
  clearError,
  selectDepartment
} from "../../../store/departmentSlice";

import Bread from "../Bread";
import Loader from "../../Present/Loader";
import DepInfo from "./DepInfo";
import ModalError from "../../Modals/ModalError";

const AboutDep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useSelector((state) => state.department.selectedDepartment);
  useEffect(() => {
    dispatch(getAllUpr());
  }, [dispatch]);

  const handleCreate = () => {
    dispatch(selectDepartment(""));
    navigate(`/contacts/create`);
  };

  const loading = useSelector((state) => state.department.loading);
  const error = useSelector((state) => state.department.error);

  let content = (
    <div>
      <Bread/>

      <div className="struct_dep_info">
        <DepInfo/>

        <div className="dep_blockAbout">
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
