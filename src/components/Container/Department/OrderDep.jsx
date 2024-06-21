import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getAllOrder, clearError} from "../../../store/departmentSlice";
import {Table, Button} from "react-bootstrap";
import TablePARow from "../../Present/TablePARow";
import TableHeader from "../../Present/TableHeader";
import TokenService from "../../../services/token.service";
import Loader from "../../Present/Loader";
import Bread from "../Bread";
import ModalError from "../../Modals/ModalError";

const OrderDep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  const orders = useSelector((state) => state.department.orders);
  const PAHeaders = useSelector((state) => state.normative.PAHeaders);
  const loading = useSelector((state) => state.department.loading);
  const error = useSelector((state) => state.department.error);
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
            navigate(`/order/new`);
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
        {orders.map((doc) => {
          return <TablePARow doc={doc} key={doc.id}/>;
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

export default OrderDep;
