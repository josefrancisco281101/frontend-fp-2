import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const { loginMutation, errorMessage } = useContext(AuthContext);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    await loginMutation.mutate(data);
  };

  return (
    <main className='h-screen flex flex-col justify-center items-center bg-gray-50'>
      <div className='max-w-[400px] w-full bg-white shadow-lg rounded-lg p-6 m-4'>
        <h2 className='text-3xl font-semibold text-center text-blue-600 mb-6'>
          Iniciar sesión
        </h2>
        <form
          onSubmit={handleLogin}
          className='flex flex-col gap-4'
        >
          <label className='text-md'>
            Nombre de usuario:
            <input
              type='text'
              name='username'
              className='border border-gray-300 rounded-md w-full p-3 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200'
              placeholder='Introduce tu nombre de usuario'
            />
          </label>
          <label className='text-md'>
            Contraseña:
            <input
              type='password' 
              name='password'
              className='border border-gray-300 rounded-md w-full p-3 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200'
              placeholder='Introduce tu contraseña'
            />
          </label>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300'
          >
            Ingresar
          </button>
          {errorMessage && (
            <p className='text-red-500 mt-4 text-center'>
              {errorMessage}
            </p>
          )}
        </form>
       
      </div>
    </main>
  );
}

export default Login;
