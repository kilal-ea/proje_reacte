import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Stock() {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateQuery, setDateQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [stocksPerPage] = useState(5); // Number of items per page

  useEffect(() => {
    const id = {
      idu: 1
    };

    axios.post('http://127.0.0.1:8000/api/stock', id)
      .then(response => {
        setStocks(response.data);
        setFilteredStocks(response.data); // Initialize with all stocks
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = stocks.filter(stock => {
      const query = searchQuery.toLowerCase();
      const date = new Date(stock.created_at).toLocaleDateString();
      return (
        (stock.id.toString().includes(searchQuery) ||
        stock.name.toLowerCase().includes(query)) &&
        date.includes(dateQuery)
      );
    });
    setFilteredStocks(filtered);
  }, [searchQuery, dateQuery, stocks]);

  // Get current stocks
  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const currentStocks = filteredStocks.slice(indexOfFirstStock, indexOfLastStock);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              <h1 className='text-2xl text-black font-bold'>Stock</h1>
            </div>
            <div className="flex justify-center p-3 space-x-4">
              <input
                type="text"
                className="border p-2 rounded"
                placeholder="Search by ID or Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <input
                type="text"
                className="border p-2 rounded"
                placeholder="Search by Date"
                value={dateQuery}
                onChange={(e) => setDateQuery(e.target.value)}
              />
            </div>
            <table className="w-full">
              <thead className="border-b rounded-xl">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    ID
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Name
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Price
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Supplier 
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Quantity C
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Quantity P
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Quantity per Carton
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentStocks.map(stock => (
                  <tr key={stock.id} className="border-b">
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{stock.id}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{stock.name}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{stock.price}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{stock.supplier_id}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{Math.floor(stock.quantity / stock.qtt_piece_in_carton)}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{Math.floor(stock.quantity % stock.qtt_piece_in_carton)}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{stock.qtt_piece_in_carton}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{new Date(stock.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center p-3">
              <Pagination
                stocksPerPage={stocksPerPage}
                totalStocks={filteredStocks.length}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Pagination = ({ stocksPerPage, totalStocks, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalStocks / stocksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='flex justify-center space-x-2'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button onClick={() => paginate(number)} className='page-link'>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Stock;
