import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../../features/auth/authSlice';

type Props = {
  to: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const CustomLink = ({ to, children, onClick }: Props) => {
  const user = useSelector(selectUser);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!user?.token) {
      event.preventDefault();
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <Link to={to} onClick={handleLinkClick}>
      {children}
    </Link>
  );
};

export default CustomLink;
