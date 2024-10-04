import React, { useContext } from 'react';
import { TieredMenu } from 'primereact/tieredmenu';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'wouter';

export default function SideBar() {
    const [location, setLocation] = useLocation();   
    const { user } = useContext(AuthContext);

    const menuAdmin = [
        {
            label: 'Incidencias',
            icon: 'pi pi-fw pi-file',
            command: () => setLocation('/incident'),
        },
        {
            label: 'Residentes',
            icon: 'pi pi-fw pi-user',
            command: () => setLocation('/resident'),
        },
    ];

    const menuResident = [
        {
            label: 'Crear Incidencias',
            icon: 'pi pi-fw pi-file',
            command: () => setLocation('/incident-create'),
        },
        {
            label: 'Solicitudes',
            icon: 'pi pi-fw pi-user',
            command: () => setLocation('/request'),
        },
    ];

    const items = user?.role === 'admin' ? menuAdmin : menuResident;

    return (
        <aside>
            <TieredMenu model={items} breakpoint='700px' />
        </aside>
    );
}
 