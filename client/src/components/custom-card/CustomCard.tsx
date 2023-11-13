import { Card } from 'antd';
import styles from './CustomCard.module.css';

const { Meta } = Card;

type Props = {
  children?: React.ReactNode;
  car?: any;
  isLoading?: any;
  className?: any;
};

const CustomCard = ({ children, car, isLoading }: Props) => {
  return (
    <Card
      className={styles.card}
      style={{ width: 300 }}
      loading={isLoading}
      cover={<img alt={car.name} src={car.image} className={styles.img} />}
      actions={[children]}
    >
      <Meta title={`Mark: ${car.name}`} description={`Price: ${car.price}$`} />
    </Card>
  );
};

export default CustomCard;
