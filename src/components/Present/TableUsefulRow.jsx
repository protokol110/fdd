import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {Icon} from "@iconify/react";
import {useState} from "react";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {delNormative} from "../../store/normativeSlice";
import ModalDel from "../Modals/ModalDel";
import TokenService from "../../services/token.service";

const TableUsefulRow = ({doc}) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const visibleAdmin = TokenService.isHaveRole("ROLE_ADMIN");
  const visibleEditor = TokenService.isHaveRole("ROLE_EDITOR");

  const handleDelete = () => {
    dispatch(delNormative({id: doc.id, path: location.pathname}));
  };

  return (
    <>
      <ModalDel
        show={show}
        handleClose={handleClose}
        handleAction={handleDelete}
      />

      <tr className="table_body_row">
        <th>{doc.datePublish}</th>
        <th>{doc.zagolovok}</th>
        <th>
          {doc.attachUsefullFiles.map((file, idx) => {
            return (
              <OverlayTrigger
                key={idx}
                placement="top"
                overlay={
                  <Tooltip id={`tooltip-${idx}`}>{file.nameFile}</Tooltip>
                }
              >
                <a
                  href={file.urlDocument}
                  target="_blank"
                  rel="noreferrer"
                  download={file.nameFile}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 36 36"
                    fontSize="32px"
                  >
                    <path
                      fill="rgba(121, 177, 105, 0.8784313725490196)"
                      d="M21.89 4H7.83A1.88 1.88 0 0 0 6 5.91v24.18A1.88 1.88 0 0 0 7.83 32h20.34A1.88 1.88 0 0 0 30 30.09V11.92ZM21 13V5.84L28.3 13Z"
                      class="clr-i-solid clr-i-solid-path-1"
                    />
                    <path fill="none" d="M0 0h36v36H0z"/>
                  </svg>
                  {/* <Icon
                    icon={"clarity:document-solid"}
                    className="table_body_row_icon"
                  /> */}
                </a>
              </OverlayTrigger>
            );
          })}
        </th>

        {visibleAdmin || visibleEditor ? (
          <th>
            <OverlayTrigger
              key={doc.id}
              placement="bottom"
              overlay={<Tooltip id={`tooltip-${doc.id}`}>Удалить</Tooltip>}
            >
              <Icon
                icon={"typcn:delete-outline"}
                className="table_body_row_icon"
                color="red"
                onClick={handleShow}
              />
            </OverlayTrigger>
          </th>
        ) : null}
      </tr>
    </>
  );
};

export default TableUsefulRow;
