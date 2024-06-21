import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTelSpr, clearError} from "../../../store/departmentSlice";
import Bread from "../Bread";
import Loader from "../../Present/Loader";
import PeoplesSpr from "./PeoplesSpr";
import DepSpr from "./DepSpr";
import ModalError from "../../Modals/ModalError";

const StructDep = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTelSpr());
  }, [dispatch]);

  const data = useSelector((state) => state.department.telSprData);
  const loading = useSelector((state) => state.department.loading);
  const error = useSelector((state) => state.department.error);

  let content =
    data.length === 0 ? null : (
      <div>
        <Bread/>

        <div className="struct_dep">
          <DepSpr/>

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

export default StructDep;
