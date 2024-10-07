import React, {useEffect, useState, useContext, useRef} from 'react'
import axios from 'axios'
import IncidentCard from '../../components/IncidentCard'
import {Toast} from 'primereact/toast'
import Loading from '../../components/Loading'
import Layout from '../../layout/Layout'
import { useLocation } from 'wouter'
import { AuthContext } from '../../context/AuthContext';

export default function IncidentAdmin() {
    const [, navigate] = useLocation();
    const {user} = useContext(AuthContext);
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);

    const handleNavigate = (incident_id) => {
        navigate(`/incident/${incident_id}`);
    }

    useEffect(() => {
        const fetchIncidents = async () => {
            
        try {
            const response = await axios.get('http://localhost:3000/api/incidents');
            setIncidents(response.data);
            
        } catch (error) {
            console.error('Error al obtener las incidencias:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudieron cargar las incidencias',
                life: 3000
            });

        } finally {
            setLoading(false);
            
        }
        }
        if (user) {
            fetchIncidents();
        }else {
            setLoading
        }
    }, [user]);
    if (loading) {
        return <Loading />
    }
    return (
        <Layout>
        <div className='incident-resident p-4 ' >
        <Toast ref={toast} />
        <h2 className='text-2xl font-bold mb-4'>Incidencias Reportadas</h2>
        {incidents.length === 0 ? (
            <p>No has reportado ninguna incidencia.</p>
        ) : (
            <div className='incident-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {incidents.map(incident => (
                    <IncidentCard key={incident.incident_id} id={incident.incident_id} title={incident.title} onClick={() => handleNavigate(incident.incident_id)} />
                ))}
            </div>
        )}
      
    </div>
    </Layout>
    )

   
}