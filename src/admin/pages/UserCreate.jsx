import React, { useState, useRef } from 'react';
import axios from 'axios';
import Layout from '../../layout/Layout';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export default function UserCreate() {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [role, setRole] = useState(null);
  const toast = useRef(null);

  const roleOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'Resident', value: 'resident' }
  ];

  const handleImageChange = (e) => {
   setImage(e.target.files[0]);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newUser = {
      fName,
      lName,
      username,
      email,
      password,      
      role,
      image: image? image.name : null

    };

    try {
      const response = await axios.post('http://localhost:3000/api/users', newUser, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Usuario creado exitosamente', life: 3000 });
      // Limpiar los campos después de enviar el formulario
      // setFName('');
      // setLName('');
      // setUsername('');
      // setEmail('');
      // setPassword('');
      // setImage('');
      // setRole(null);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el usuario', life: 3000 });
    }
  };

  return (
    <Layout>
      <div className='user-create'>
        <h1>Crear Usuario</h1>
        <form onSubmit={handleSubmit} className='flex flex-column gap-3'>
          
          <div className='field'>
            <label htmlFor="fName" className="block font-bold">Nombre:</label>
            <InputText id="fName" value={fName} onChange={(e) => setFName(e.target.value)} className="w-full" />
          </div>

          <div className='field'>
            <label htmlFor="lName" className="block font-bold">Apellido:</label>
            <InputText id="lName" value={lName} onChange={(e) => setLName(e.target.value)} className="w-full" />
          </div>

          <div className='field'>
            <label htmlFor="username" className="block font-bold">Username:</label>
            <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full" />
          </div>

          <div className='field'>
            <label htmlFor="email" className="block font-bold">Email:</label>
            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
          </div>

          <div className='field'>
            <label htmlFor="password" className="block font-bold">Contraseña:</label>
            <InputText id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full" />
          </div>

          <div className="field">
            <label htmlFor="image" className="block font-bold">
              Imagen (opcional):
            </label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className='field'>
            <label htmlFor="role" className="block font-bold">Rol:</label>
            <Dropdown
              id="role"
              value={role}
              options={roleOptions}
              onChange={(e) => setRole(e.value)}
              placeholder="Seleccionar rol"
              className="w-full"
            />
          </div>

          <Button type="submit" label="Crear Usuario" severity="info" />
        </form>

        <Toast ref={toast} />
      </div>
    </Layout>
  );
}
