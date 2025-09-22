import React from 'react';
import { Modal, Button } from 'antd';
import { getStatusColor } from '../utils/ordersUtils';

const ViewOrderModal = ({
  visible,
  onCancel,
  selectedRecord,
  isDark
}) => {
  return (
    <Modal
      title="Order Details"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="close" onClick={onCancel}>
          Close
        </Button>
      ]}
      width={500}
    >
      {selectedRecord && (
        <div className="space-y-4">
          <div><strong>Order ID:</strong> {selectedRecord.orderId}</div>
          <div><strong>User:</strong> {selectedRecord.user.name}</div>
          <div><strong>Project:</strong> {selectedRecord.project}</div>
          <div><strong>Address:</strong> {selectedRecord.address}</div>
          <div><strong>Date:</strong> {selectedRecord.date}</div>
          <div><strong>Status:</strong> <span style={{ color: getStatusColor(selectedRecord.status) }}>{selectedRecord.status}</span></div>
        </div>
      )}
    </Modal>
  );
};

export default ViewOrderModal;