import {Button, Table} from "react-bootstrap";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getAllUseful, clearError} from "../../../store/normativeSlice";
import TokenService from "../../../services/token.service";
import TableUsefulRow from "../../Present/TableUsefulRow";
import TableHeader from "../../Present/TableHeader";
import Loader from "../../Present/Loader";
import Bread from "../Bread";
import ModalError from "../../Modals/ModalError";

const UsefulBlock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUseful());
  }, [dispatch]);

  const {usefuls: docs, PAHeadersUseful: PAHeaders, loading, error} = useSelector((state) => state.normative);
  const hasRole = (role) => TokenService.isHaveRole(role);
  const visibleAdmin = hasRole("ROLE_ADMIN");
  const visibleEditor = hasRole("ROLE_EDITOR");

  const content = (
    <>
      <Bread/>
      {(visibleAdmin || visibleEditor) && (
        <Button
          variant="success"
          type="submit"
          className="mb-3"
          onClick={() => navigate(`/educ/new`)}
          style={{backgroundColor: "#34606BFF", border: "none"}}
        >
          Добавить
        </Button>
      )}
      <Table className="ps-2" style={{marginRight: "20px",backgroundColor: "#34606BFF", border: "none"}} >
        <thead>
        <TableHeader labels={PAHeaders}/>
        </thead>
        <tbody>
        {docs.map((doc) => <TableUsefulRow doc={doc} key={doc.id}/>)}
        </tbody>
      </Table>
    </>
  );

  return error.show ? (
    <ModalError
      show={error.show}
      errText={error.text}
      handleClose={() => dispatch(clearError())}
    />
  ) : loading ? <Loader/> : content;
};

export default UsefulBlock;
