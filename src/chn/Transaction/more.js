import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function More() {
  const [bon, setBon] = useState([]);
  const code = useSelector((state) => state.codetr);
  
  useEffect(() => {
    const requestData = { code };

    axios.post('http://127.0.0.1:8000/api/Transaction/bon/more', requestData)
      .then(response => {
        setBon(response.data);
      })
      .catch(error => {
        console.log({'err':error});
      });
  }, [code]);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white border-b rounded-xl">
            <div className='flex justify-center p-3'>
              <h1 className='text-2xl text-black font-bold'>Bon</h1>
            </div>
            <div>
              <div className='p-5'>
              <h1 className='text-sm font-medium text-black'>Code : <span className='text-gray-700'>{code}</span></h1>
              </div>
              <div>
              <table className="w-full">
              <thead>
                <tr>
                  <th className="text-sm text-center font-medium text-gray-900 px-6 py-4">ID</th>
                  <th className="text-sm text-center font-medium text-gray-900 px-6 py-4">Name</th>
                  <th className="text-sm text-center font-medium text-gray-900 px-6 py-4">Price</th>
                  <th className="text-sm text-center font-medium text-gray-900 px-6 py-4">Quantity C</th>
                  <th className="text-sm text-center font-medium text-gray-900 px-6 py-4">Quantity P</th>
                  <th className="text-sm text-center font-medium text-gray-900 px-6 py-4">Created At</th>
                </tr>
              </thead>
              <tbody>
                {bon.map((bonItem, key) => (
                  <tr key={key}>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{bonItem.id}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{bonItem.name}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{bonItem.price}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{Math.floor(bonItem.quantity / bonItem.qtt_piece_in_carton)}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{Math.floor(bonItem.quantity % bonItem.qtt_piece_in_carton)}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{bonItem.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default More;
