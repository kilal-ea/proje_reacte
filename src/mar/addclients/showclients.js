import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ShowClients() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 5;

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/clients/show');
        setClients(response.data);
        setFilteredClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const filtered = clients.filter(client =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.id.toString().includes(searchQuery) ||
      client.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredClients(filtered);
    setCurrentPage(1); // Reset to the first page on new search
  }, [searchQuery, clients]);

  // Calculate current clients
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  // Pagination Controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Determine page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredClients.length / clientsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='justify-center flex mt-14'>
      <div className="flex flex-col items-center bg-gray-100 w-full p-4 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Client List</h2>
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded-lg"
          />
        </div>
        <table className="w-full justify-center">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.map(client => (
              <tr key={client.id}>
                <td className='text-center p-1'>{client.id}</td>
                <td className='text-center p-1'>{client.name}</td>
                <td className='text-center p-1'>{client.phone}</td>
                <td className='text-center p-1'>{client.email}</td>
                <td className='text-center p-1'>{client.city}</td>
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
  );
}

export default ShowClients;
