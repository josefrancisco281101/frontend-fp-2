import React from 'react';
import { Switch, Route } from 'wouter';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './pages/ProtectedRoute';
//componentes de residente
import IncidentCreate from './resident/pages/IncidentCreate';
import IncidentResident from './resident/pages/IncidentResident';
import IncidentDetails from './resident/pages/IncidentDetails';


function App() {
  return (
    <>
     
      <Route path="/" component={() => <Login section="/" />} />
           
        <ProtectedRoute>
        <Route path='/dashboard' component={() => <Dashboard section="/dashboard"/>} />
        <Route path="/incident-create" component={() => <IncidentCreate section="/incident-create" />} />
        <Route path="/request" component={() => <IncidentResident section="/request" />} />
        <Route path="/incident/:id" component={() => <IncidentDetails section="/incident/:id" />} />
           
        </ProtectedRoute>
  
    </>
  );
}

export default App;
