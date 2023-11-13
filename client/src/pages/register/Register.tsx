import { Card, Form, Row, Space, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import CustomInput from '../../components/custom-input/CustomInput';
import PasswordInput from '../../components/password-input/PasswordInput';
import CustomButton from '../../components/custom-button/CustomButton';
import { Paths } from '../../paths';
import styles from '../login/Login.module.css';
import { selectUser } from '../../features/auth/authSlice';
import { useRegisterMutation } from '../../app/services/auth';
import { User } from '../../interface';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import ErrorMessage from '../../components/error-message/ErrorMessage';

type RegisterData = Omit<User, 'id'> & { confirmPassword: string };

const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState('');
  const [registerUser] = useRegisterMutation();

  useEffect(() => {
    if (user) {
      navigate(Paths.carsCatalog);
    }
  }, [user, navigate]);

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();

      navigate(Paths.carsCatalog);
    } catch (error) {
      const maybeError = isErrorWithMessage(error);

      if (maybeError) {
        setError(error.data.message);
      } else {
        setError('Unknown error');
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card
          title={<span className={styles.title}>Register</span>}
          className={styles.card}
        >
          <Form onFinish={register}>
            <CustomInput type="text" placeholder="Name" name="name" />
            <CustomInput type="email" placeholder="Email" name="email" />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Repeat Password"
            />
            <CustomButton type="primary" htmlType="submit">
              Register
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Register?
              <Link className={styles.link} to={Paths.login}>
                Login
              </Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Register;
