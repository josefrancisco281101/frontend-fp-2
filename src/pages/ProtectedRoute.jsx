import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { getMyInformation } from '../api/authApi';
import Loading from '../components/Loading';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const authToken = localStorage.getItem('authToken');
  const { setUserData } = useContext(AuthContext); 
  const [, navigate] = useLocation(); 

  const { data, isError, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getMyInformation(authToken),
    retry: 1,
    enabled: Boolean(authToken), 
  });


  useEffect(() => {
    if (data && !isError && !isLoading) {
      setUserData(data); 
    }
  }, [data, isError, setUserData, isLoading]);

 
  if (isLoading) {
    return <Loading />;
  }


  if (!authToken || (isError && !data)) {
    localStorage.removeItem('authToken'); 
    console.clear();
    navigate('/'); 
    return null;
  }

 
  return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.any.isRequired,
  };
  
  export default ProtectedRoute;