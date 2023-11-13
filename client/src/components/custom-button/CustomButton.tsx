import { Button, Form } from 'antd';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?:
    | 'link'
    | 'text'
    | 'default'
    | 'ghost'
    | 'primary'
    | 'dashed'
    | undefined;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  danger?: boolean | undefined;
  loading?:
    | boolean
    | {
        delay?: number | undefined;
      }
    | undefined;
  icon?: React.ReactNode;
};

const CustomButton = ({
  children,
  type,
  htmlType = 'button',
  danger,
  loading,
  onClick,
  icon,
}: Props) => {
  return (
    <Form.Item>
      <Button
        type={type}
        htmlType={htmlType}
        danger={danger}
        loading={loading}
        size="middle"
        onClick={onClick}
        icon={icon}
      >
        {children}
      </Button>
    </Form.Item>
  );
};

export default CustomButton;
