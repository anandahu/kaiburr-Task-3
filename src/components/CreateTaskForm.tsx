import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { type TaskInput, createOrUpdateTask } from '../services/api';

// Define props for the component, including a callback for when the form is successfully submitted
interface CreateTaskFormProps {
  onFormSubmit: () => void; // Function to call after successful submission (e.g., to refresh list)
  onCancel: () => void; // Function to call when the cancel button is clicked
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onFormSubmit, onCancel }) => {
  const [form] = Form.useForm<TaskInput>(); // Hook to control the form instance
  const [submitting, setSubmitting] = React.useState(false);

  // Function to handle form submission
  const handleSubmit = async (values: TaskInput) => {
    setSubmitting(true);
    try {
      // Basic command validation (similar to backend, but client-side for immediate feedback)
       if (values.command.includes("rm ") || values.command.includes("sudo ") || values.command.includes("shutdown")) {
           message.error('Unsafe command detected! Please avoid commands like rm, sudo, shutdown.');
           setSubmitting(false);
           return; // Stop submission
       }

      await createOrUpdateTask(values);
      message.success('Task created successfully!');
      form.resetFields(); // Clear the form fields
      onFormSubmit(); // Call the success callback (passed from parent)
    } catch (error) {
      message.error('Failed to create task. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical" // Stack labels above inputs
      onFinish={handleSubmit} // Function to call when form is submitted and validated
      initialValues={{ name: '', owner: '', command: '' }} // Default empty values
    >
      <Form.Item
        name="name"
        label="Task Name"
        rules={[{ required: true, message: 'Please enter the task name!' }]} // Validation rule
      >
        <Input placeholder="e.g., Print Hostname" />
      </Form.Item>

      <Form.Item
        name="owner"
        label="Owner"
        rules={[{ required: true, message: 'Please enter the owner name!' }]}
      >
        <Input placeholder="e.g., Your Name" />
      </Form.Item>

      <Form.Item
        name="command"
        label="Shell Command"
        rules={[{ required: true, message: 'Please enter the command to execute!' }]}
      >
        <Input.TextArea rows={3} placeholder="e.g., hostname" />
      </Form.Item>

      <Form.Item style={{ textAlign: 'right' }}>
        {/* Add Cancel button */}
        <Button style={{ marginRight: 8 }} onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        {/* Submit button with loading state */}
        <Button type="primary" htmlType="submit" loading={submitting}>
          Create Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateTaskForm;