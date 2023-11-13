import { Button, Result, Row } from 'antd';
import { Link, useParams } from 'react-router-dom';

const Statuses: Record<string, string> = {
  created: 'Car created successfully',
  delete: 'Car delete successfully',
  updated: 'Car updated successfully',
  404: '404',
};

const Status = () => {
  const { status } = useParams();

  const styleStatus =
    status && Statuses[status] ? (
      <span style={{ color: 'white' }}>{Statuses[status]}</span>
    ) : null;

  return (
    <Row align="middle" justify="center" style={{ width: '100%' }}>
      <Result
        status={status && Statuses[status] !== '404' ? 'success' : '404'}
        title={status ? styleStatus : '404'}
        extra={
          <Button type="primary" key="dashboard">
            <Link to="/" style={{ color: 'white' }}>
              Back Home
            </Link>
          </Button>
        }
      />
    </Row>
  );
};

export default Status;
