import { useNavigate } from 'react-router-dom';
import { InfoCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useGetAllCarsQuery } from '../../app/services/cars';
import CustomButton from '../../components/custom-button/CustomButton';
import Layout from '../../components/layout/Layout';
import styles from './CarsCatalog.module.css';
import { Paths } from '../../paths';
import { selectUser } from '../../features/auth/authSlice';
import CustomCard from '../../components/custom-card/CustomCard';
import NotData from '../../components/not-data/NotData';

const CarsCatalog = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllCarsQuery();

  useEffect(() => {
    if (!user) {
      navigate(Paths.login);
    }
  }, [user, navigate]);

  const goToAddCar = () => navigate(Paths.carAdd);

  return (
    <Layout>
      <CustomButton
        onClick={goToAddCar}
        type="primary"
        icon={<PlusCircleOutlined />}
      >
        Add
      </CustomButton>
      {!data?.length && <NotData />}
      <div className={styles.cards}>
        {data?.map(car => (
          <CustomCard
            key={car._id}
            children={[
              <InfoCircleOutlined
                key={car._id}
                onClick={() => navigate(`${Paths.cars}/${car._id}`)}
              />,
            ]}
            car={car}
            isLoading={isLoading}
          />
        ))}
      </div>
    </Layout>
  );
};

export default CarsCatalog;
