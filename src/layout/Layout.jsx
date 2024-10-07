import PropTypes from 'prop-types';
import Nav from '../components/Nav';
import SideBar from '../components/SideBar';

 function Layout ({ children })  {
    return (
        <main >
          
           
            <div className=""> 
                <Nav />
               
            </div>
           <div className='flex'>
            
           <div className="principal flex items-center bg-slate-300 w-[240px] h-screen"> 
            <SideBar />
            </div>
            <div className="flex justify-center items-center text-center w-full">
                    {children}
                </div>
           </div>
        </main>
    );
}

Layout.propTypes = {
    children: PropTypes.any.isRequired,
};

export default Layout;
