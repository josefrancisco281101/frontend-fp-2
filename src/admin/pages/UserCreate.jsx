import React, { useState, useRef, useContext} from 'react';
import axios from 'axios';
import Layout from '../../layout/Layout';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useLocation } from 'wouter';
export default function IncidentCreate() {
    
    const [, setLocation] = useLocation();
  
  const [fName, setfName] = useState('');
  const [lName, setLname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [image_url, setImage_url] = useState(null);
  const [role, setRole] = useState(null);
  const toast = useRef(null);

  const roleTypes = [
    { label: 'Residente ', value: 'resident' },
    { label: 'Administrador', value: 'admin' }
  
  ];

  


  const handleImageChange = (e) => {
    setImage_url(e.target.files[0]);
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  
  
      const userData = {
       
        fName,
        lName,
        username,
        email,
        password,
        role,       
        image_url: image_url? image_url.name : null
    };
  
   
  
    try {
      const response = await axios.post('http://localhost:3000/api/users', userData, {
        headers: {
          'Content-Type': 'application/json'        }
      });
  
      setfName('');
      setLname('');
      setUsername('');
      setEmail('');
      setPassword('');
      setImage_url(null);
      setRole(null);
  
     
      
      toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'usuario creado', life: 3000 });
    } catch (error) {
      console.error(error.message);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al crear el usuario', life: 3000 });
    }
  };
  
  return (
    <Layout>
      <div className='incident-create'>
        <h1>Crear Usuario</h1>
        <form onSubmit={handleSubmit} className='flex flex-column gap-3'>
          
          <div className='field'>
            <label htmlFor="fName" className="block font-bold">Nombre:</label>
            <InputText id="fName" value={fName} onChange={(e) => setfName(e.target.value)} className="w-full" name='fName' />
          </div>

          <div className='field'>
            <label htmlFor="lName" className="block font-bold">apellido:</label>
            <InputText id="lName" value={lName} onChange={(e) => setLname(e.target.value)} className="w-full" name='lName' />
          </div>

          <div className='field'>
            <label htmlFor="username" className="block font-bold">nombre de usuario:</label>
            <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full" name='username' />
          </div>

          <div className='field'>
            <label htmlFor="email" className="block font-bold">correo electrónico:</label>
            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" name='email' />
          </div>
          <div className='field'>
            <label htmlFor="password" className="block font-bold"> contrasena:</label>
            <InputText id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" name='password' />
          </div>

          <div className='field'>
            <label htmlFor="roleType" className="block font-bold">Rol:</label>
            <Dropdown
              id="roleType"
              value={role}
              options={roleTypes}
              onChange={(e) => setRole(e.value)}
              placeholder="Seleccionar Rol"
              className="w-full"
              name='type'
            />
          </div>

          
          <div className="field">
            <label htmlFor="image_url" className="block font-bold">
              Imagen (opcional):
            </label>
            <input type="file" id="image_url" accept="image/*" onChange={handleImageChange} />
          </div>

          <Button  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105"  type="submit" label="Crear Usuario" severity="info" />

          <button  className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
           onClick={() => 
           
              setLocation('/resident')
            
          }>volver</button>
          
        </form>

        <Toast ref={toast} />
      </div>
    </Layout>
  );
}
