import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import IncidentCard from '../../components/IncidentCard';
import { AuthContext } from '../../context/AuthContext';
import { Toast } from 'primereact/toast';
import Loading from '../../components/Loading';
import Layout from '../../layout/Layout';

export default function IncidentResident() {
    const { user } = useContext(AuthContext); 
   
    console.log(user)

    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/incidents'); 
               
              


               
                const filteredIncidents = response.data.filter(incident => incident.user_id === user.user_id);
                setIncidents(filteredIncidents); 
                
            } catch (error) {
                console.error('Error al obtener las incidencias:', error);
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudieron cargar las incidencias.',
                    life: 3000
                });
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchIncidents();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <Loading />;
    }

    return (
        <Layout>
            <div className='incident-resident p-4'>
                <Toast ref={toast} />
                <h2 className='text-2xl font-bold mb-4'>Mis Incidencias</h2>
                {incidents.length === 0 ? (
                    <p>No has reportado ninguna incidencia.</p>
                ) : (
                    <div className='incident-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {incidents.map(incident => (
                            <IncidentCard key={incident.id} id={incident.id} title={incident.title} />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
