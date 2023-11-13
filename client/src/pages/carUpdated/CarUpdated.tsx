import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCarQuery, useUpdatedCarMutation } from '../../app/services/cars';
import Spinner from '../../components/spin/Spinner';
import Layout from '../../components/layout/Layout';
import { Row } from 'antd';
import CarForm from '../../components/car-form/CarForm';
import { Cars } from '../../interface';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

const CarUpdated = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState('');
  const { data, isLoading } = useGetCarQuery(params.id || '');
  const [updated] = useUpdatedCarMutation();

  if (isLoading) {
    return <Spinner />;
  }

  const handleUpDatedCar = async (car: Cars) => {
    try {
      const upCarDated = {
        ...data,
        ...car,
      };

      await updated(upCarDated).unwrap();

      navigate(`${Paths.status}/updated`);
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
        <CarForm
          title="Add-Car"
          btnText="Add"
          car={data}
          onFinish={handleUpDatedCar}
          error={error}
        />
      </Row>
    </Layout>
  );
};

export default CarUpdated;
