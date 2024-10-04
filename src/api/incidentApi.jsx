import axios from 'axios';

export const getAllIncidents = async (token) => {
  try {
    const res = await axios.get('http://localhost:3000/api/incidents', {
      headers: { Authorization: token },
    });
    return res.data;
  } catch (error) {
    console.error('Error al obtener las incidencias', error);
    throw error;
  }
};

export const getIncidentById = async (token, incidentId) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/incidents/${incidentId}`, {
        headers: { Authorization: token },
      });
      return res.data;
    } catch (error) {
      console.error('Error al obtener la incidencia', error);
      throw error;
    }
  };

  export const createIncident = async ({ token, data }) => {
    try {
      const res = await axios.post('http://localhost:3000/api/incidents', data, {
        headers: { Authorization: token },
      });
      return res.data;
    } catch (error) {
      console.error('Error al crear la incidencia', error);
      throw error;
    }
  };