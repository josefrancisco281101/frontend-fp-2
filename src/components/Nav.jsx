import proptypes from 'prop-types';
import { Link, useLocation } from 'wouter';

function Nav({nombre}) {
  const [, navigate] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    console.clear();
    navigate('/');
  }
  


    return (
        <nav className='bg-blue-400 text-xl h-[70px] flex justify-between items-center gap-5 px-5'>
          <ul className='text-white'>
            <li>
              <Link to="/dashboard">Home </Link>  
            </li>
            </ul>
            
            <div className='flex gap-4 justify-center items-center'>
            <span className='text-white font-bold'>{nombre}</span>
            <button
            onClick={handleLogout} 
            className='bg-red-400 text-white px-3 py-2 rounded-md'>
              Cerrar sesión
            </button>

            </div>

        </nav>
    );
}


Nav.propTypes = {
  nombre: proptypes.string,
};

export default Nav;
