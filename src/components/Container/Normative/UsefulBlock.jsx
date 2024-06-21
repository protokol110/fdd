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

  const docs = useSelector((state) => state.normative.usefuls);
  const PAHeaders = useSelector((state) => state.normative.PAHeadersUseful);
  const loading = useSelector((state) => state.normative.loading);
  const error = useSelector((state) => state.normative.error);
  const visibleAdmin = TokenService.isHaveRole("ROLE_ADMIN");
  const visibleEditor = TokenService.isHaveRole("ROLE_EDITOR");

  let content = (
    <>
      <Bread/>

      {visibleAdmin || visibleEditor ? (
        <Button
          variant="success"
          type="submit"
          className="mb-3"
          onClick={() => {
            navigate(`/documents/new`);
          }}
        >
          Добавить
        </Button>
      ) : null}

      <Table>
        <thead>
        <TableHeader labels={PAHeaders}/>
        </thead>

        <tbody>
        {docs.map((doc) => {
          return <TableUsefulRow doc={doc} key={doc.id}/>;
        })}
        </tbody>
      </Table>
    </>
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

export default UsefulBlock;
