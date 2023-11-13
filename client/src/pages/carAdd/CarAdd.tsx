import { Row } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import CarForm from '../../components/car-form/CarForm';
import { selectorCars } from '../../features/cars/carsSlice';
import { Paths } from '../../paths';
import { useAddCarMutation } from '../../app/services/cars';
import { Cars } from '../../interface';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

const CarAdd = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = useSelector(selectorCars);
  const [addCar] = useAddCarMutation();

  useEffect(() => {
    if (!user) {
      navigate(Paths.login);
    }
  }, [user, navigate]);

  const handleAddCar = async (data: Cars) => {
    try {
      await addCar(data).unwrap();

      navigate(`${Paths.status}/created`);
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
          onFinish={handleAddCar}
          error={error}
        />
      </Row>
    </Layout>
  );
};

export default CarAdd;
