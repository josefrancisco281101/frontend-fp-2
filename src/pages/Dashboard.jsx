import React, { useContext } from 'react'; 
import { AuthContext } from "../context/AuthContext";
import Layout from '../layout/Layout';
import PropTypes from 'prop-types';


function Dashboard({ section }) {
    const { user } = useContext(AuthContext);
    

    const renderSection = () => {
        switch (section) {
            case '/incident-create':
                return  ;

                case '/request':
                return ;

            // case '/request/:id':
            //     return ;
            
              
            default:
                return <h2 className='text-2xl font-bold'>Bienvenido {user ? user.f_name : 'Usuario'}</h2>;
        } 
    };

    return (
        <Layout>
            <div className="dashboard">        
                <section>
                   {renderSection()}
                </section>
            </div>
        </Layout>
    );
}

Dashboard.propTypes = {
    section: PropTypes.string.isRequired,
};

export default Dashboard;
