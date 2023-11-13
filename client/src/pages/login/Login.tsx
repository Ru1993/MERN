import { useState } from 'react';
import { Card, Form, Row, Space, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import CustomInput from '../../components/custom-input/CustomInput';
import PasswordInput from '../../components/password-input/PasswordInput';
import CustomButton from '../../components/custom-button/CustomButton';
import { UserData, useLoginMutation } from '../../app/services/auth';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import ErrorMessage from '../../components/error-message/ErrorMessage';
import { Paths } from '../../paths';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loginUser, loginUserResult] = useLoginMutation();

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();

      navigate('/');
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
          title={<span className={styles.title}>Sign in</span>}
          className={styles.card}
        >
          <Form onFinish={login}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <CustomButton
              type="primary"
              htmlType="submit"
              loading={loginUserResult.isLoading}
            >
              Enter
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              No account?
              <Link className={styles.link} to={Paths.register}>
                Register
              </Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
