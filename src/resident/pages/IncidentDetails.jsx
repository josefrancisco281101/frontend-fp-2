import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Layout from '../../layout/Layout';
import { useRoute, useLocation } from 'wouter';
import { Toast } from 'primereact/toast';
import Loading from '../../components/Loading';

export default function IncidentDetails() {
    const { user } = useContext(AuthContext);
    const [, setLocation] = useLocation();
    const [incident, setIncident] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const toast = useRef(null);
    const [match, params] = useRoute('/incident/:incident_id');
    const incident_id = match ? params.incident_id : null;

    useEffect(() => {
        const fetchIncidentDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/incidents/incident/${incident_id}`);
                setIncident(response.data);
                
            } catch (error) {
                console.error('Error al obtener los detalles de la incidencia:', error);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los detalles de la incidencia', life: 3000 });
            } finally {
                setLoading(false);
            }
        };

        fetchIncidentDetails();
    }, [incident_id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setIncident({ ...incident, [name]: value });
        console.log(incident);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/api/incidents/incident/${incident_id}, incident`);
            if (response.status === 200) {
                setIncident(response.data); 
               
                toast.current.show({ severity: 'success', summary: 'Actualización exitosa', detail: 'La incidencia ha sido actualizada correctamente', life: 3000 });
            } else {
                throw new Error('Error en la respuesta del servidor');
            }
        } catch (error) {
            console.error('Error al actualizar la incidencia:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la incidencia', life: 3000 });
        }
    };
    
    const handleDeleteIncident = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/incidents/incident/${incident_id}`);
            toast.current.show({ severity: 'success', summary: 'Eliminación exitosa', detail: 'La incidencia ha sido eliminada correctamente', life: 3000 });
            
       
        } catch (error) {
            console.error('Error al eliminar la incidencia:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la incidencia', life: 3000 });
        }
    };
    if (loading) {
        return <Loading />;
    }

    if (!incident) {
        return (
            <Layout>
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">Detalles de la Incidencia</h2>
                    <p>No se encontró la incidencia.</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-4">
                <Toast ref={toast} />
                <h2 className="text-2xl font-bold mb-4">Detalles de la Incidencia</h2>

                <form onSubmit={handleFormSubmit}>
                    <div className="incident-details">
                        {/* Campo título */}
                        <div className="field">
                            <label className="block font-bold">Título:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="title"
                                    value={incident.title}
                                    onChange={handleInputChange}
                                    className="p-inputtext p-component"
                                />
                            ) : (
                                <p>{incident.title}</p>
                            )}
                        </div>

                        {/* Campo descripción */}
                        <div className="field">
                            <label className="block font-bold">Descripción:</label>
                            {isEditing ? (
                                <textarea
                                    name="description"
                                    value={incident.description}
                                    onChange={handleInputChange}
                                    className="p-inputtextarea p-component"
                                />
                            ) : (
                                <p>{incident.description}</p>
                            )}
                        </div>

                        {/* Campo tipo (type) */}
                        <div className="field">
                            <label className="block font-bold">Tipo de Incidencia:</label>
                            {isEditing ? (
                                <select
                                    name="type"
                                    value={incident.type}
                                    onChange={handleInputChange}
                                    className="p-inputtext p-component"
                                >
                                    <option value="plumbing">Plomería</option>
                                    <option value="electricity">Electricidad</option>
                                    <option value="common_area">Área común</option>
                                    <option value="other">Otro</option>
                                </select>
                            ) : (
                                <p>{incident.type}</p>
                            )}
                        </div>

                        {/* Campo prioridad */}
                        <div className="field">
                            <label className="block font-bold">Prioridad:</label>
                            {isEditing ? (
                                <select
                                name="priority"
                                value={incident.priority}
                                onChange={handleInputChange}
                                className="p-inputtext p-component"
                            >
                                <option value="alta">alta</option>
                                <option value="media">media</option>
                                <option value="normal">normal</option>
                                <option value="baja">baja</option>
                            </select>
                            ) : (
                                <p>{incident.priority}</p>
                            )}
                        </div>

                        {/* Campo estado (status) */}
                        <div className="field">
                            <label className="block font-bold">Estado:</label>
                            {isEditing && user.role === 'admin' ? (
                                <select
                                    name="status"
                                    value={incident.status}
                                    onChange={handleInputChange}
                                    className="p-inputtext p-component"
                                >
                                    <option value="reported">Reportado</option>
                                    <option value="in_progress">En progreso</option>
                                    <option value="resolved">Resuelto</option>
                                </select>
                            ) : (
                                <p>{incident.status}</p>
                            )}
                        </div>

                        {/* Nuevo Campo Location */}
                        <div className="field">
                            <label className="block font-bold">Ubicación:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="location"
                                    value={incident.location}
                                    onChange={handleInputChange}
                                    className="p-inputtext p-component"
                                />
                            ) : (
                                <p>{incident.location}</p>
                            )}
                        </div>

                        {/* Campo imagen */}
                        <div className="field">
    <label className="block font-bold">Imagen:</label>
    {isEditing ? (
        <input
            type="text"
            name="image_url"
            value={incident.image_url}
            onChange={handleInputChange}
            className="p-inputtext p-component"
        />
    ) : (
        <img 
            src={incident.image_url} 
            alt="Imagen de la incidencia" 
            style={{ maxWidth: '100%', maxHeight: '300px' }} 
        />
    )}
</div>


                    </div>

                    {/* Botones de Guardar y Editar */}
                    {isEditing ? (
                        <div className="mt-4">
                            <button type="submit" className="p-button p-component p-button-success" onClick= {handleFormSubmit}>Guardar Cambios</button>

                            <button className='mx-2' onClick={()=> {  if (user) {
            
            if (user.role === 'admin') {
                setLocation('/incident');
            } else {
                setLocation('/request');
            }
        }}}>volver</button>
                           
                            <button type="button" className="p-button p-component p-button-secondary ml-2" onClick={() => setIsEditing(false)}>
                                Cancelar
                            </button >
                            <button  type="button" className="p-button p-component p-button-danger ml-2" onClick={ () => {handleDeleteIncident(); 
                               if (user) {
            
            if (user.role === 'admin') {
                setLocation('/incident');
            } else {
                setLocation('/request');
            }
        } }}>
                         Eliminar Incidencia       
                            </button>
                        </div>
                    ) : (
                        <button type="button" className="p-button p-component p-button-primary mt-4" onClick={() => setIsEditing(true)}>
                            Editar Incidencia
                        </button>
                    )}
                </form>
            </div>
        </Layout>
    );
}