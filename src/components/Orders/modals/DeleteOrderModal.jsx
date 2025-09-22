import React from 'react';
import { Modal } from 'antd';

const DeleteOrderModal = ({
  visible,
  onCancel,
  onOk,
  recordToDelete
}) => {
  return (
    <Modal
      title="Confirm Delete"
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Delete"
      okType="danger"
      cancelText="Cancel"
      width={520}
    >
      {recordToDelete && (
        <p>Are you sure you want to delete order {recordToDelete.orderId}?</p>
      )}
    </Modal>
  );
};

export default DeleteOrderModal;