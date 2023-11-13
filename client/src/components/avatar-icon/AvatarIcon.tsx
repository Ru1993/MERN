import { Avatar, Form, Space } from 'antd';
import styles from './AvatarIcon.module.css';

type Props = {
  children: React.ReactNode;
};

const AvatarIcon = ({ children }: Props) => {
  return (
    <Space>
      <Form.Item>
        <Avatar className={styles.ava}>{children}</Avatar>
      </Form.Item>
    </Space>
  );
};

export default AvatarIcon;
