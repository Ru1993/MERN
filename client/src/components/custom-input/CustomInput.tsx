import { Form, Input } from 'antd';

type Props = {
  placeholder?: string | undefined;
  name: string | undefined;
  type: string | undefined;
};

const CustomInput = ({ placeholder, type = 'text', name }: Props) => {
  return (
    <Form.Item
      name={name}
      shouldUpdate={true}
      rules={[{ required: true, message: 'Obligatory field' }]}
    >
      <Input placeholder={placeholder} type={type} size="large" />
    </Form.Item>
  );
};

export default CustomInput;
