import { SmileOutlined } from '@ant-design/icons';
import { Result } from 'antd';

const NotData = () => (
  <Result
    icon={<SmileOutlined />}
    title={
      <span style={{ color: 'white' }}>
        at the moment you have not added anything yet!
      </span>
    }
  />
);

export default NotData;
