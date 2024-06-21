import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {Icon} from "@iconify/react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {delReport} from "../../store/reportSlice";
import {useState} from "react";
import ModalDel from "../Modals/ModalDel";
import TokenService from "../../services/token.service";

const TableReportRow = ({report}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDel, setShowDel] = useState(false);
  const handleShowDel = () => setShowDel(true);
  const handleCloseDel = () => setShowDel(false);
  const visibleAdmin = TokenService.isHaveRole("ROLE_ADMIN");
  const visibleEditor = TokenService.isHaveRole("ROLE_EDITOR");

  const handleDelete = () => {
    dispatch(delReport({id: report.id}));
    navigate(`/report`);
  };

  const handleEdit = () => {
    navigate(`/report/edit/${report.id}`);
  };

  return (
    <>
      <ModalDel
        show={showDel}
        handleClose={handleCloseDel}
        handleAction={handleDelete}
      />

      <tr className="table_body_row" key={report.id}>
        <th>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id={`tooltip-${report.id}`}>{report.nameOtchet}</Tooltip>
            }
          >
            <a
              href={report.url}
              target="_blank"
              rel="noreferrer"
              className="report_row"
            >
              {report.nameOtchet}
            </a>
          </OverlayTrigger>
        </th>
        <th>{report.contentOtchet}</th>
        <th>{report.period}</th>
        <th>{report.otvetstv}</th>
        <th>{report.architect}</th>
        <th>{report.metodolog}</th>
        {visibleAdmin || visibleEditor ? (
          <th>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id={`tooltip-${report.id}`}>Редактировать</Tooltip>
              }
            >
              <Icon
                icon={"typcn:edit"}
                className="table_body_row_icon"
                color="gray"
                onClick={handleEdit}
              />
            </OverlayTrigger>

            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id={`tooltip-${report.id}`}>Удалить</Tooltip>}
            >
              <Icon
                icon={"typcn:delete-outline"}
                className="table_body_row_icon"
                color="red"
                onClick={handleShowDel}
              />
            </OverlayTrigger>
          </th>
        ) : null}
      </tr>
    </>
  );
};

export default TableReportRow;
