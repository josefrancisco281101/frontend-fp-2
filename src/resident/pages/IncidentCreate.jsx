import React, { useState, useRef, useContext} from 'react';
import axios from 'axios';
import Layout from '../../layout/Layout';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { AuthContext } from '../../context/AuthContext';
export default function IncidentCreate() {
    const { user } = useContext(AuthContext);
    console.log(user)
  const [title, setTitle] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [image, setImage] = useState(null); 
  const toast = useRef(null);

  const incidentTypes = [
    { label: 'Fallo técnico', value: 'technical' },
    { label: 'Solicitud de mejora', value: 'improvement' },
    { label: 'Otro', value: 'other' }
  ];

  const priorities = ['Alta', 'Media', 'Normal', 'Baja'];

  const handleImageUpload = (e) => {
    setImage(e.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
        toast.current.show({ severity: 'warn', summary: 'Error', detail: 'Debe estar logueado para reportar una incidencia', life: 3000 });
      return;
    }

   
    const incidentData = new FormData();
    incidentData.append('title', title);
    incidentData.append('type', selectedType.value);
    incidentData.append('description', description);
    incidentData.append('location', location);
    incidentData.append('priority', priority);
    incidentData.append('userId', user.id); 
    incidentData.append('status', 'Pendiente'); 
    if (image) {
      incidentData.append('image_url', image); 
    }

    try {
      const response = await axios.post('http://localhost:3000/api/incidents', incidentData, {
        headers: { 'Content-Type': 'multipart/form-data' }
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
            <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full" />
          </div>

          <div className='field'>
            <label htmlFor="description" className="block font-bold">Descripción de la Incidencia:</label>
            <InputText id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full" />
          </div>

          <div className='field'>
            <label htmlFor="location" className="block font-bold">Ubicación:</label>
            <InputText id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full" />
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

          <div className='field'>
            <label htmlFor="image" className="block font-bold">Subir Imagen (Opcional):</label>
            <FileUpload name="image" accept="image/*" customUpload uploadHandler={handleImageUpload} mode="basic" auto />
          </div>

          <Button type="submit" label="Reportar Incidencia" severity="info" />
        </form>

        <Toast ref={toast} />
      </div>
    </Layout>
  );
}
