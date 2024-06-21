import {Modal, Button} from "react-bootstrap";

const ModalError = ({show, handleClose, errText}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{errText}</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalError;
