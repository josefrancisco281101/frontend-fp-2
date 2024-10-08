import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import { Toast } from "primereact/toast";
import Loading from "../../components/Loading";
import { Card } from "primereact/card";
import { useLocation } from "wouter";

export default function ResidentView() {
    const [, navigate] = useLocation();
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);

    const handleNavigate = () => {
        navigate("/create-resident");
    }

    useEffect(() => {
        const fetchResidents = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/users");

                const filteredResidents = response.data.filter(user => user.role === 'resident');
                
                setResidents(filteredResidents);
            } catch (error) {
                console.error("Error al obtener los residentes:", error);
                toast.current.show({ severity: "error", summary: "Error", detail: "No se pudieron cargar los residentes", life: 3000 });
            } finally {
                setLoading(false);
            }
        };

        fetchResidents();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <Layout>
            <Toast ref={toast} />
            <div className="p-4">

                <button onClick={handleNavigate}>crear nuevo usuario</button>
                <h2 className="text-2xl font-bold mb-4">Lista de Residentes</h2>

                {residents.length > 0 ? (
                    <div className="p-grid">
                        {residents.map((resident) => (
                            <div key={resident.id} className="p-col-12 p-md-6 p-lg-4">
                                <Card 
                                    title={`${resident.f_name} ${resident.l_name}`} 
                                    subTitle={`Correo: ${resident.email}`} 
                                    style={{ width: '100%' }}
                                >
                                    
                                </Card>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No hay residentes registrados.</p>
                )}
            </div>
        </Layout>
    );
}
