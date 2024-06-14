import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function ProfitMargin() {
  const [profitMargin, setProfitMargin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/profitMargin')
      .then(response => {
        setProfitMargin(response.data);
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

  // Filter profit margin based on search query
  const filteredItems = profitMargin.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toString().includes(searchQuery)
  );

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white border-b rounded-xl">
            <div className='flex justify-center p-3'>
              <h1 className='text-2xl text-black font-bold'>Profit Margin</h1>
            </div>
            <div className="flex justify-center p-3">
              <input
                type="text"
                placeholder="Search by name or ID"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left px-6 py-4">ID</th>
                  <th className="text-left px-6 py-4">Name</th>
                  <th className="text-left px-6 py-4">Quantity C Before Sell</th>
                  <th className="text-left px-6 py-4">Quantity P Before Sell</th>
                  <th className="text-left px-6 py-4">Quantity C Sell</th>
                  <th className="text-left px-6 py-4">Quantity P Sell</th>
                  <th className="text-left px-6 py-4">Total Purchase Price</th>
                  <th className="text-left px-6 py-4">Total Sell Price</th>
                  <th className="text-left px-6 py-4">Profit Margin</th>
                  <th className="text-left px-6 py-4">Created At</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(item => (
                  <tr key={item.id} className="border-b">
                    <td className="text-center px-6 py-4">{item.id}</td>
                    <td className="text-center px-6 py-4">{item.name}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{Math.floor(item.Quantity_before_sell / item.qtt_piece_in_carton) ?? 0}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{Math.floor(item.Quantity_before_sell % item.qtt_piece_in_carton) ?? 0}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{Math.floor(item.Quantity_sell / item.qtt_piece_in_carton) ?? 0}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{Math.floor(item.Quantity_sell % item.qtt_piece_in_carton) ?? 0}</td>
                    <td className="text-center px-6 py-4">{item.Total_purchase_price ?? 0}</td>
                    <td className="text-center px-6 py-4">{item.Total_sell_price ?? 0}</td>
                    <td className="text-center px-6 py-4">{item.profit_margin ?? 0}</td>
                    <td className="text-center px-6 py-4">{new Date(item.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="flex justify-center mt-4">
              {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 mx-1 font-medium text-gray-800 rounded-xl ${currentPage === index + 1 ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfitMargin;
