import React, { useEffect, useState } from 'react';
import Dm from './dm';
import Dc from './dc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Dash() {
  const [city, setcity] = useState(<Dc/>);
  const navigate = useNavigate();

  const funv1 = () => {
    setcity(<Dm/>);
  };

  const funv2 = () => { 
    setcity(<Dc/>);
  };
  
  const funv3 = () => { 
    localStorage.removeItem('user'); // Change from sessionStorage to localStorage
  };
  
  useEffect(() => {
    funv2();
  }, []);

  return (
    <div className='h-screen'>
      <nav className='bg-gray-800 text-white flex justify-between items-center p-4 relative '>
        <h1 className="text-3xl font-bold text-center border-gray-700">Dashboard</h1>
        <div className='flex justify-center'>
          <div>
            <button onClick={funv2} className="text-blue-700 w-1/2 text-center px-6 py-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 rounded-l-md border-r border-gray-300">
              China
            </button>
            <button onClick={funv1} className="text-blue-700 w-1/2 text-center px-6 py-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 rounded-r-md">
              Morocco
            </button>
          </div>
          <button onClick={funv3} className="text-blue-700  ml-2 text-center px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 rounded-full">
            <FontAwesomeIcon icon={faSignOutAlt} /> 
          </button>
        </div>
      </nav>
      <div className=' bg-slate-400'>
        {city}
      </div>
    </div>
  );
}

export default Dash;
