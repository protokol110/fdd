import {Button, Table} from "react-bootstrap";

import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {getAllReports, clearError} from "../../../store/reportSlice";
import TokenService from "../../../services/token.service";

import TableReportRow from "../../Present/TableReportRow";
import TableHeader from "../../Present/TableHeader";
import Loader from "../../Present/Loader";
import ModalError from "../../Modals/ModalError";

const ReportBlock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllReports());
  }, [dispatch]);

  const reports = useSelector((state) => state.report.reports);
  const headers = useSelector((state) => state.report.headers);
  const loading = useSelector((state) => state.report.loading);
  const error = useSelector((state) => state.report.error);
  const visibleAdmin = TokenService.isHaveRole("ROLE_ADMIN");
  const visibleEditor = TokenService.isHaveRole("ROLE_EDITOR");

  let content = (
    <>
      {visibleAdmin || visibleEditor ? (
        <Button
          variant="success"
          type="submit"
          className="mb-3"
          onClick={() => {
            navigate(`/report/new`);
          }}
        >
          Добавить
        </Button>
      ) : null}

      <Table>
        <thead>
        <TableHeader labels={headers}/>
        </thead>

        {reports.length > 0 ? (
          <tbody>
          {reports.map((report) => {
            return <TableReportRow report={report} key={report.id}/>;
          })}
          </tbody>
        ) : null}
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

export default ReportBlock;
