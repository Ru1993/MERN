import { Card, Form, Space } from 'antd';
import { Cars } from '../../interface';
import CustomInput from '../custom-input/CustomInput';
import ErrorMessage from '../error-message/ErrorMessage';
import CustomButton from '../custom-button/CustomButton';
import styles from './CarForm.module.css';

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  car?: T;
};

const CarForm = ({ onFinish, btnText, title, error, car }: Props<Cars>) => {
  return (
    <Card
      title={<span className={styles.title}>{title}</span>}
      className={styles.card}
    >
      <Form name="car-form" onFinish={onFinish} initialValues={car}>
        <CustomInput type="text" name="name" placeholder="Name" />
        <CustomInput type="number" name="price" placeholder="Price" />
        <CustomInput type="text" name="image" placeholder="Image" />
        <Space direction="vertical" size="small">
          <CustomButton type="primary" htmlType="submit">
            {btnText}
          </CustomButton>
          <ErrorMessage message={error} />
        </Space>
      </Form>
    </Card>
  );
};

export default CarForm;
