import { useCurrentQuery } from '../../app/services/auth';
import Spinner from '../../components/spin/Spinner';

const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return <Spinner />;
  }

  return children;
};

export default Auth;
