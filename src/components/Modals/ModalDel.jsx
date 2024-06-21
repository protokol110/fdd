import {Modal, Button} from "react-bootstrap";

const ModalDel = ({show, handleClose, handleAction}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Удаление</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы действительно хотите удалить запись?</Modal.Body>
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

export default ModalDel;
