import {Modal, Button} from "react-bootstrap";

const ModalClearIcon = ({show, handleClose, handleAction}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Удаление</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы действительно хотите удалить иконку новости?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleAction}>
          Удалить
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalClearIcon;
