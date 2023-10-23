import React from "react";
import { Modal, Button } from "react-bootstrap";

interface Props {
  showModal: boolean;
  hideModal: () => void;
  confirmModal: (id: number) => void;
  id: number;
}

const DeleteConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  id,
}: Props) => {
  const message = "삭제하시겠습니까?";

  return (
    <Modal
      show={showModal}
      onHide={hideModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-danger">{message}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="default" onClick={hideModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => confirmModal(id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmation;
