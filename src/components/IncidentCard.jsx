import PropTypes from 'prop-types';

import { useLocation } from 'wouter';

function IncidentCard({ id, title }) {

    const [, navigate] = useLocation();
    return (
        <div 
            className='Card p-4 border rounded shadow hover:shadow-lg cursor-pointer'
            onClick={() => navigate(`/incident/${id}`)}
        >
            <h3 className='text-xl font-semibold'>{title}</h3>
        </div>
    )
}


IncidentCard.propTypes = {
    id: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired
}

export default IncidentCard