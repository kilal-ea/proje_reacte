import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { codeatt, contentsm } from '../../redux/action';
import More from './more';

function Transactionsbonatt() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/Transaction/bon/att')
      .then(response => {
        setTransactions(response.data);
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
  const more = (codebon) => {
    dispatch(codeatt(codebon));
    dispatch(contentsm(<More/>));
  }
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white border-b rounded-xl">
            <div className='flex justify-center p-3'>
              <h1 className='text-2xl text-black font-bold'>Bon's Waiting</h1>
            </div>
            <table className="w-full">
              <thead className=" border-b rounded-xl">
                <tr>
                  <th scope="col" className="text-sm text-center font-medium text-gray-900 px-6 py-4">
                    ID
                  </th>
                  <th scope="col" className="text-sm text-center font-medium text-gray-900 px-6 py-4">
                    Code
                  </th>
                  <th scope="col" className="text-sm text-center font-medium text-gray-900 px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className="text-sm text-center font-medium text-gray-900 px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id} className="border-b">
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{transaction.id}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{transaction.code}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{transaction.created_at}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <button onClick={() => more(transaction.code)} className='bg-blue-600 text-white px-8 py-2 rounded-lg'>
                        More
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

export default Transactionsbonatt;
