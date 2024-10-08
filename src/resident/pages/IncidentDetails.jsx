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
            const response = await axios.put(`http://localhost:3000/api/incidents/incident/${incident_id}`, incident);
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
    <div className="incident-details bg-white p-8 rounded-lg shadow-lg space-y-6">
        {/* Campo título */}
        <div className="field">
            <label className="block text-lg font-semibold text-gray-700 mb-1">Título:</label>
            {isEditing ? (
                <input
                    type="text"
                    name="title"
                    value={incident.title}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
            ) : (
                <p className="text-gray-600">{incident.title}</p>
            )}
        </div>

        {/* Campo descripción */}
        <div className="field">
            <label className="block text-lg font-semibold text-gray-700 mb-1">Descripción:</label>
            {isEditing ? (
                <textarea
                    name="description"
                    value={incident.description}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
            ) : (
                <p className="text-gray-600">{incident.description}</p>
            )}
        </div>

        {/* Campo tipo (type) */}
        <div className="field">
            <label className="block text-lg font-semibold text-gray-700 mb-1">Tipo de Incidencia:</label>
            {isEditing ? (
                <select
                    name="type"
                    value={incident.type}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                >
                    <option value="plumbing">Plomería</option>
                    <option value="electricity">Electricidad</option>
                    <option value="common_area">Área común</option>
                    <option value="other">Otro</option>
                </select>
            ) : (
                <p className="text-gray-600">{incident.type}</p>
            )}
        </div>

        {/* Campo prioridad */}
        <div className="field">
            <label className="block text-lg font-semibold text-gray-700 mb-1">Prioridad:</label>
            {isEditing ? (
                <select
                    name="priority"
                    value={incident.priority}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                >
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="normal">Normal</option>
                    <option value="baja">Baja</option>
                </select>
            ) : (
                <p className="text-gray-600">{incident.priority}</p>
            )}
        </div>

        {/* Campo estado (status) */}
        <div className="field">
            <label className="block text-lg font-semibold text-gray-700 mb-1">Estado:</label>
            {isEditing && user.role === 'admin' ? (
                <select
                    name="status"
                    value={incident.status}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                >
                    <option value="reported">Reportado</option>
                    <option value="in_progress">En progreso</option>
                    <option value="resolved">Resuelto</option>
                </select>
            ) : (
                <p className="text-gray-600">{incident.status}</p>
            )}
        </div>

        {/* Campo ubicación */}
        <div className="field">
            <label className="block text-lg font-semibold text-gray-700 mb-1">Ubicación:</label>
            {isEditing ? (
                <input
                    type="text"
                    name="location"
                    value={incident.location}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
            ) : (
                <p className="text-gray-600">{incident.location}</p>
            )}
        </div>

        {/* Campo imagen */}
        <div className="field">
            <label className="block text-lg font-semibold text-gray-700 mb-1">Imagen:</label>
            {isEditing ? (
                <input
                    type="text"
                    name="image_url"
                    value={incident.image_url}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
            ) : (
                <img 
                    src={incident.image_url} 
                    alt="Imagen de la incidencia" 
                    className="max-w-full max-h-60 object-cover rounded-md shadow"
                />
            )}
        </div>
    </div>

    {/* Botones de acción */}
    {isEditing ? (
        <div className="mt-6 flex flex-wrap gap-4">
            <button type="submit" className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-md transition hover:bg-green-600">
                Guardar Cambios
            </button>

            <button 
                className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg shadow-md transition hover:bg-gray-200"
                onClick={() => {
                    if (user.role === 'admin') setLocation('/incident');
                    else setLocation('/request');
                }}
            >
                Volver
            </button>

            <button 
                type="button" 
                className="bg-gray-400 text-white py-3 px-6 rounded-lg shadow-md transition hover:bg-gray-500"
                onClick={() => setIsEditing(false)}
            >
                Cancelar
            </button>

            <button 
                type="button" 
                className="bg-red-500 text-white py-3 px-6 rounded-lg shadow-md transition hover:bg-red-600"
                onClick={() => { 
                    handleDeleteIncident(); 
                    if (user.role === 'admin') setLocation('/incident');
                    else setLocation('/request');
                }}
            >
                Eliminar Incidencia
            </button>
        </div>
    ) : (
        <button 
            type="button" 
            className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md transition hover:bg-blue-600 mt-6"
            onClick={() => setIsEditing(true)}
        >
            Editar Incidencia
        </button>
    )}
</form>

            </div>
        </Layout>
    );
}