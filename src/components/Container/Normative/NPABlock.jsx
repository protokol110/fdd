import { Button, Table } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllNPA, clearError } from "../../../store/normativeSlice";
import TokenService from "../../../services/token.service";
import TablePARow from "../../Present/TablePARow";
import TableHeader from "../../Present/TableHeader";
import Loader from "../../Present/Loader";
import Bread from "../Bread";
import ModalError from "../../Modals/ModalError";

const NPABlock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllNPA());
  }, [dispatch]);

  const {NPAs: docs, PAHeaders, loading, error} = useSelector((state) => state.normative);
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
          onClick={() => navigate(`/documents/new`)}
        >
          Добавить
        </Button>
      )}
      <Table>
        <thead>
        <TableHeader labels={PAHeaders}/>
        </thead>
        {docs.length > 0 && (
          <tbody>
          {docs.map((doc) => <TablePARow doc={doc} key={doc.id}/>)}
          </tbody>
        )}
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

export default NPABlock;
