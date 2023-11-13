import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useDeleteCarMutation, useGetCarQuery } from '../../app/services/cars';
import Layout from '../../components/layout/Layout';
import CustomCard from '../../components/custom-card/CustomCard';
import { Paths } from '../../paths';
import ErrorMessage from '../../components/error-message/ErrorMessage';
import Spinner from '../../components/spin/Spinner';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

const CarDetail = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetCarQuery(params.id || '');
  const [deleteCar] = useDeleteCarMutation();

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <Navigate to={`${Paths.status}/404`} />;
  }

  const handlerDeleteCardCar = async () => {
    setIsModalOpen(false);
    try {
      await deleteCar(data._id).unwrap();

      navigate(`${Paths.status}/delete`);
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
      <CustomCard
        car={data}
        children={[
          <EditOutlined
            key="updated"
            onClick={() => navigate(`${Paths.carUpdated}/${data._id}`)}
          />,
          <DeleteOutlined key="delete" onClick={() => setIsModalOpen(true)} />,
        ]}
        isLoading={isLoading}
      />
      <ErrorMessage message={error} />
      <Modal
        title="Confirm deletion"
        open={isModalOpen}
        onOk={handlerDeleteCardCar}
        onCancel={() => setIsModalOpen(false)}
        okText="confirm"
        cancelText="cancel"
      >
        Are you sure you want to remove the employee from the table?
      </Modal>
    </Layout>
  );
};

export default CarDetail;
