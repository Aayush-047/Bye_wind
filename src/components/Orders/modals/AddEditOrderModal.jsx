import React from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';

const AddEditOrderModal = ({
  visible,
  onCancel,
  onOk,
  form,
  selectedRecord,
  isDark
}) => {
  return (
    <Modal
      title={selectedRecord ? "Edit Order" : "Add New Order"}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onOk}
      >
        <Form.Item
          name="userName"
          label="User Name"
          rules={[{ required: true, message: 'Please enter user name' }]}
        >
          <Input placeholder="Enter user name" />
        </Form.Item>
        
        <Form.Item
          name="project"
          label="Project"
          rules={[{ required: true, message: 'Please enter project name' }]}
        >
          <Input placeholder="Enter project name" />
        </Form.Item>
        
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please enter address' }]}
        >
          <Input placeholder="Enter address" />
        </Form.Item>
        
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select status' }]}
        >
          <Select placeholder="Select status">
            <Select.Option value="In Progress">In Progress</Select.Option>
            <Select.Option value="Complete">Complete</Select.Option>
            <Select.Option value="Pending">Pending</Select.Option>
            <Select.Option value="Approved">Approved</Select.Option>
            <Select.Option value="Rejected">Rejected</Select.Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="date"
          label="Date"
        >
          <DatePicker className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditOrderModal;