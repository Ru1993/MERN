import { Spin } from 'antd';
import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.example}>
      <Spin />
    </div>
  );
};

export default Spinner;
