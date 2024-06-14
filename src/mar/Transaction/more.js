import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { contentsm } from '../../redux/action';
import Stock from '../stock/Stock';

function More() {
  const [bon, setBon] = useState([]);
  const [douanes, setDouanes] = useState('');
  const [frais, setFrais] = useState([]);
  const code = useSelector((state) => state.codeatt);
  const dispatch = useDispatch();

  useEffect(() => {
    if (code) {
      axios.post('http://127.0.0.1:8000/api/Transaction/bon/more', { code })
        .then(response => {
          setBon(response.data);
          setFrais(Array(response.data.length).fill(0));
          console.log('data:', response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [code]);

  const sendata = () => {
    const data = {
      code,
      frais,
      douanes,
    };
    axios.post('http://127.0.0.1:8000/api/Transaction/bon/accept', data)
      .then(response => {
        console.log(response.data);
        if (response.data === true) {
          dispatch(contentsm(<Stock />));
          window.location.reload(); 
        }
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  };
  

  const formatDate = (datetime) => datetime.split(' ')[0];

  const handleFraisChange = (id, value) => {
    setFrais(prevFrais => {
      const newFrais = [...prevFrais];
      const index = bon.findIndex(bonItem => bonItem.id === id);
      if (index !== -1) {
        newFrais[index] = value;
      }
      return newFrais;
    });
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white border-b rounded-xl">
            <div className='flex justify-center p-3'>
              <h1 className='text-2xl text-black font-bold'>Bon</h1>
            </div>
            <div className='p-5'>
              <h1 className='text-sm font-medium text-black'>Code: <span className='text-gray-700'>{code}</span></h1>
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
                    <th className="text-sm text-center font-medium text-gray-900 px-6 py-4">Douanes</th>
                  </tr>
                </thead>
                <tbody>
                  {bon.map((bonItem, index) => (
                    <tr key={bonItem.id}>
                      <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{bonItem.id}</td>
                      <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{bonItem.name}</td>
                      <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{bonItem.price}</td>
                      <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{Math.floor(bonItem.quantity / bonItem.qtt_piece_in_carton)}</td>
                      <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{Math.floor(bonItem.quantity % bonItem.qtt_piece_in_carton)}</td>
                      <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{formatDate(bonItem.created_at)}</td>
                      <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input
                          type='number'
                          value={frais[index] || 0}
                          onChange={(e) => handleFraisChange(bonItem.id, e.target.value)}
                          className='w-full p-1 border rounded'
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='flex'>
              <div className='p-6 w-1/2'>
                <h2 className='text-sm font-medium text-black'>Frais</h2>
                <input
                  type='number'
                  name='douanes'
                  value={douanes}
                  onChange={(e) => setDouanes(e.target.value)}
                  className='w-full p-1 border rounded'
                />
              </div>
              <div className='p-10 w-1/2 flex justify-end'>
                <button onClick={sendata} className='bg-blue-600 text-white px-8 py-2 rounded-lg'>Accept</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default More;
