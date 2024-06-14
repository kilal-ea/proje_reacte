import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { codebon, contentsm } from '../../redux/action';
import More from './more';

function Ventebon() {
  const [bon, setBon] = useState([]);
  const [filteredBon, setFilteredBon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCode, setSearchCode] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const recordsPerPage = 5;
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/Vente/bon')
      .then(response => {
        setBon(response.data);
        setFilteredBon(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = bon.filter(transaction => {
      const code = transaction.code ? String(transaction.code).toLowerCase() : '';
      const date = new Date(transaction.created_at).toLocaleDateString();
      return code.includes(searchCode.toLowerCase()) && date.includes(searchDate);
    });
    setFilteredBon(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  }, [searchCode, searchDate, bon]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const more = (code) => {
    dispatch(codebon(code));
    dispatch(contentsm(<More />));
  }

  // Calculate current records
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredBon.slice(indexOfFirstRecord, indexOfLastRecord);

  // Pagination Controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Determine page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredBon.length / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white border-b rounded-xl">
            <div className='flex justify-center p-3'>
              <h1 className='text-2xl text-black font-bold'>Bon's Waiting</h1>
            </div>
            <div className="flex justify-center p-3 space-x-4">
              <input
                type="text"
                placeholder="Search by Code"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Search by Date (MM/DD/YYYY)"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              />
            </div>
            <table className="w-full">
              <thead className="border-b rounded-xl">
                <tr>
                  <th scope="col" className="text-sm text-center font-medium text-gray-900 px-6 py-4">
                    ID
                  </th>
                  <th scope="col" className="text-sm text-center font-medium text-gray-900 px-6 py-4">
                    Code
                  </th>
                  <th scope="col" className="text-sm text-center font-medium text-gray-900 px-6 py-4">
                    Price Total
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
                {currentRecords.map(transaction => (
                  <tr key={transaction.id} className="border-b">
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{transaction.id}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{transaction.code}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{transaction.priceTotal}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{new Date(transaction.created_at).toLocaleDateString()}</td>
                    <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <button onClick={() => more(transaction.code)} className='bg-blue-600 text-white px-8 py-2 rounded-lg'>
                        More
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center p-3">
              <nav>
                <ul className='flex justify-center space-x-2'>
                  {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                      <button onClick={() => paginate(number)} className='page-link px-4 py-2 border rounded'>
                        {number}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ventebon;
