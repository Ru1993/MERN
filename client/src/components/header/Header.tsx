import {
  CarOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Space, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import CustomButton from '../custom-button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../features/auth/authSlice';
import { Paths } from '../../paths';
import AvatarIcon from '../avatar-icon/AvatarIcon';
import CustomLink from '../custom-link/CustomLink';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [messageInfo, contextHolder] = message.useMessage();

  const userLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate(Paths.login);
  };

  const errorsMessage = () => {
    if (!user?.token) {
      return messageInfo.open({
        type: 'warning',
        content: 'access to this page is restricted',
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Layout.Header className={styles.header}>
        <Space>
          <CustomLink to="/" onClick={errorsMessage}>
            <CustomButton type="link" icon={<CarOutlined />}>
              Cars
            </CustomButton>
          </CustomLink>
        </Space>
        {user ? (
          <Space>
            <AvatarIcon>{user.name}</AvatarIcon>
            <CustomButton
              type="link"
              icon={<LogoutOutlined />}
              onClick={userLogout}
            >
              Logout
            </CustomButton>
          </Space>
        ) : (
          <Space>
            <Link to="/register">
              <CustomButton type="link" icon={<UserOutlined />}>
                Register
              </CustomButton>
            </Link>
            <Link to="/login">
              <CustomButton type="link" icon={<LoginOutlined />}>
                Entrance
              </CustomButton>
            </Link>
          </Space>
        )}
      </Layout.Header>
    </>
  );
};

export default Header;
