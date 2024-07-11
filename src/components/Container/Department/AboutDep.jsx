import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
  getAllUpr,
  clearError,
} from "../../../store/departmentSlice";

import Bread from "../Bread";
import Loader from "../../Present/Loader";
import DepInfo from "./DepInfo";
import ModalError from "../../Modals/ModalError";
import PeoplesSpr from "./PeoplesSpr";

const AboutDep = () => {
  const dispatch = useDispatch();
  useSelector((state) => state.department.selectedDepartment);
  useEffect(() => {
    dispatch(getAllUpr());
  }, [dispatch]);

  const loading = useSelector((state) => state.department.loading);
  const error = useSelector((state) => state.department.error);

  let content = (
    <div>
      <Bread/>

      <div className="struct_dep_info">
        <DepInfo/>
        <PeoplesSpr/>
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
