import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { contentsc } from '../../redux/action';
import Transactionsbon from './Transactionbon';

function Transaction() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const id = { idu: 1 };
    axios.post('http://127.0.0.1:8000/api/stocktr', id)
      .then(response => {
        setStocks(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleToggle = (id, stockName, quantity, qtt_piece_in_carton) => {
    const index = data.findIndex(item => item.id === id);
    if (index === -1) {
      setData(prevData => [...prevData, { id, name: stockName, quantity, qtt_piece_in_carton }]);
    } else {
      setData(prevData => prevData.filter(item => item.id !== id));
    }
  };

  const toggleShowData = () => {
    setShowData(prev => !prev);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredStocks = stocks.filter(stock =>
    stock.id.toString().includes(searchQuery) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const send = () => {
    const newDataSend = {
      id: data.map(pro => pro.id),
      quantitySend: data.map(pro => parseInt(document.getElementById(`idc-${pro.id}`).value, 10) * pro.qtt_piece_in_carton + parseInt(document.getElementById(`idp-${pro.id}`).value, 10))
    };

    const exceedsStock = data.some(pro => {
      const quantitySend = parseInt(document.getElementById(`idc-${pro.id}`).value, 10) * pro.qtt_piece_in_carton + parseInt(document.getElementById(`idp-${pro.id}`).value, 10);
      return quantitySend > pro.quantity;
    });

    if (exceedsStock) {
      console.log("Quantity to send exceeds available stock quantity.");
      return;
    }

    console.log(newDataSend);
    axios.post('http://127.0.0.1:8000/api/Transaction', newDataSend)
      .then(response => {
        if (response.data === true) {
          dispatch(contentsc(<Transactionsbon />));
          window.location.reload();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div>
          <button className='px-6 py-1 bg-white text-slate-700 rounded-lg mb-2' onClick={toggleShowData}>Toggle Data</button>
          {showData && (
            <div className='bg-white rounded-xl pb-2'>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-center">ID</th>
                    <th className="px-4 py-2 text-center">Name</th>
                    <th className="px-4 py-2 text-center">Quantity C in stock</th>
                    <th className="px-4 py-2 text-center">Quantity P in stock</th>
                    <th className="px-4 py-2 text-center">Quantity Carton</th>
                    <th className="px-4 py-2 text-center">Quantity Piece</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(stock => (
                    <tr key={stock.id}>
                      <td className="px-4 py-2 text-center">{stock.id}</td>
                      <td className="px-4 py-2 text-center">{stock.name}</td>
                      <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{Math.floor(stock.quantity / stock.qtt_piece_in_carton)}</td>
                      <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{stock.quantity % stock.qtt_piece_in_carton}</td>
                      <td className="px-4 py-2 text-center">
                        <input
                          type='number'
                          id={`idc-${stock.id}`}
                          defaultValue={0}
                        />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <input
                          type='number'
                          id={`idp-${stock.id}`}
                          defaultValue={0}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='flex justify-center'>
                <button className='px-6 py-1 bg-slate-400 text-white rounded-lg' onClick={send}>Validate</button>
              </div>
            </div>
          )}
        </div>
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white border-b rounded-xl">
            <div className='flex justify-center p-3'>
              <h1 className='text-2xl text-black font-bold'>Transaction</h1>
            </div>
            <div className='flex justify-center mb-4'>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="px-4 py-2 border rounded-lg"
              />
            </div>
            <table className="w-full">
              <thead className="border-b rounded-xl">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                    ID
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                    Quantity C
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                    Quantity P 
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map(stock => (
                  <tr key={stock.id} className="border-b">
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{stock.id}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{stock.name}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{Math.floor(stock.quantity / stock.qtt_piece_in_carton)}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{stock.quantity % stock.qtt_piece_in_carton}</td>
                    <td className="text-center px-6 py-4 whitespace-nowrap">
                      <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${data.find(item => item.id === stock.id) ? 'bg-red-500 hover:bg-red-700' : ''}`} onClick={() => handleToggle(stock.id, stock.name, stock.quantity, stock.qtt_piece_in_carton)}>
                        {data.find(item => item.id === stock.id) ? 'Delete' : 'Add'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
