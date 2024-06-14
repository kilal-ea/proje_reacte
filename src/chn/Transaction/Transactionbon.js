import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { codetr, contentsc } from '../../redux/action';
import { useDispatch } from 'react-redux';
import More from './more';

function Transactionsbon() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/Transaction/bon')
      .then(response => {
        setTransactions(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const filteredStocks = transactions.filter(transactions => 
    transactions.created_at.split(" ")[0].toString().includes(searchQuery)
  );

  const more = (codebon) => {
    dispatch(codetr(codebon));
    dispatch(contentsc(<More/>));
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white border-b rounded-xl">
            <div className='flex justify-center p-3'>
              <h1 className='text-2xl text-black font-bold'>Transactions Bon</h1>
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
                    Created At
                  </th>
                  <th scope="col" className="text-sm text-center font-medium text-gray-900 px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map(transaction => (
                  <tr key={transaction.id} className="border-b">
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{transaction.id}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{transaction.code}</td>
                    <td className={`text-center text-sm font-light px-6 py-4 whitespace-nowrap ${transaction.status == 0 ? 'text-red-500' : 'text-gray-900'}`}>
                      {transaction.status == 0 ? <span className='text-red-700 font-semibold'>No accepted</span> : <span className='text-green-700 font-semibold'>Accepted</span>}
                    </td>
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

export default Transactionsbon;
