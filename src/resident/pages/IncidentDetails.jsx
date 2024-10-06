import React, {useEffect, useState, useContext, useRef} from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import Layout from '../../layout/Layout'
import { useRoute } from 'wouter'
import { Toast } from 'primereact/toast'
import Loading from '../../components/Loading';



export default function IncidentDetails() {

    const {user} = useContext(AuthContext)       
    const [incident, setIncident] = useState(null)
    const [loading, setLoading] = useState(true)
    const toast = useRef(null)
    const [match, params] = useRoute('/incident/:incident_id');
    const incident_id = match ? params.incident_id : null;

    console.log("incident_id recibido:", incident_id);

    

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
        

        fetchIncidentDetails()
    }, [incident_id])
    
    if (loading) {
        return <Loading />
    }
    if (!incident) {
        return (
            <Layout>
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">Detalles de la Incidencia</h2>
                    <p>No se encontró la incidencia.</p>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
        <div className="p-4">
            <Toast ref={toast} />
            <h2 className="text-2xl font-bold mb-4">Detalles de la Incidencia</h2>
            
            <div className="incident-details">
                <div className="field">
                    <label className="block font-bold">Título:</label>
                    <p>{incident.title}</p>
                </div>

                <div className="field">
                    <label className="block font-bold">Descripción:</label>
                    <p>{incident.description}</p>
                </div>

                <div className="field">
                    <label className="block font-bold">Ubicación:</label>
                    <p>{incident.location}</p>
                </div>

                <div className="field">
                    <label className="block font-bold">Tipo de Incidencia:</label>
                    <p>{incident.type}</p>
                </div>

                <div className="field">
                    <label className="block font-bold">Prioridad:</label>
                    <p>{incident.priority}</p>
                </div>

                <div className="field">
                    <label className="block font-bold">Reportado por:</label>
                    <p>{user.f_name} {user.l_name}</p> 
                </div>

                <div className="field">
                    <label className="block font-bold">Estado:</label>
                    <p>{incident.status}</p>
                </div>
            </div>
        </div>
    </Layout>
    )
}