import React, { useState, useRef, useContext} from 'react';
import axios from 'axios';
import Layout from '../../layout/Layout';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { AuthContext } from '../../context/AuthContext';
export default function IncidentCreate() {
    const { user } = useContext(AuthContext);
    console.log(user)
  const [title, setTitle] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState('Normal');  
  const toast = useRef(null);

  const incidentTypes = [
    { label: 'plomeria ', value: 'plumbing' },
    { label: 'electricidad', value: 'electricity' },
    { label: 'areas comunes', value: 'common_area' },
    { label: 'Otro', value: 'other' }
  ];

  const priorities = ['Alta', 'Media', 'Normal', 'Baja'];


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user) {
      toast.current.show({ severity: 'warn', summary: 'Error', detail: 'Debe estar logueado para reportar una incidencia', life: 3000 });
      return;
    }
  
      const incidentData = {
      userId: user.user_id,
      title,
      description,
      location,
      type: selectedType,
      priority,
      status: "reported"    };
  
    console.log(incidentData); 
  
    try {
      const response = await axios.post('http://localhost:3000/api/incidents', incidentData, {
        headers: {
          'Content-Type': 'application/json'        }
      });
      console.log(response.data);
      toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Incidencia reportada', life: 3000 });
    } catch (error) {
      console.error(error.message);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al reportar la incidencia', life: 3000 });
    }
  };
  
  return (
    <Layout>
      <div className='incident-create'>
        <h1>Reportar Incidencia</h1>
        <form onSubmit={handleSubmit} className='flex flex-column gap-3'>
          
          <div className='field'>
            <label htmlFor="title" className="block font-bold">Título:</label>
            <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full" name='title' />
          </div>

          <div className='field'>
            <label htmlFor="description" className="block font-bold">Descripción de la Incidencia:</label>
            <InputText id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full" name='description' />
          </div>

          <div className='field'>
            <label htmlFor="location" className="block font-bold">Ubicación:</label>
            <InputText id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full" name='location' />
          </div>

          <div className='field'>
            <label htmlFor="incidentType" className="block font-bold">Tipo de Incidencia:</label>
            <Dropdown
              id="incidentType"
              value={selectedType}
              options={incidentTypes}
              onChange={(e) => setSelectedType(e.value)}
              placeholder="Seleccionar tipo de incidencia"
              className="w-full"
              name='type'
            />
          </div>

          <div className='field'>
            <label htmlFor="priority" className="block font-bold">Prioridad:</label>
            {priorities.map((level) => (
              <div key={level} className="field-radiobutton">
                <RadioButton
                  inputId={level}
                  name="priority"
                  value={level}
                  onChange={(e) => setPriority(e.value)}
                  checked={priority === level}
                />
                <label htmlFor={level}>{level}</label>
              </div>
            ))}
          </div>

          <Button type="submit" label="Reportar Incidencia" severity="info" />
        </form>

        <Toast ref={toast} />
      </div>
    </Layout>
  );
}
