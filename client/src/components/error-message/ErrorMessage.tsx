import { Alert } from 'antd';
import styles from './ErrorMessage.module.css';

type Props = {
  message?: string;
};

const ErrorMessage = ({ message }: Props) => {
  if (!message) {
    return null;
  }

  return (
    <Alert message={message} type="error" showIcon className={styles.error} />
  );
};

export default ErrorMessage;
