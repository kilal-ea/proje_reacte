import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ShowSupplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/Supplier');
        setSuppliers(response.data);
        setFilteredSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  useEffect(() => {
    const filtered = suppliers.filter(supplier =>
      supplier.id.toString().includes(searchQuery) ||
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSuppliers(filtered);
  }, [searchQuery, suppliers]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='justify-center flex mt-14'>
      <div className="flex flex-col items-center bg-gray-100 w-full p-4 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Supplier List</h2>
        <div className="mb-4">
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
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map(supplier => (
              <tr key={supplier.id}>
                <td className='text-center p-1'>{supplier.id}</td>
                <td className='text-center p-1'>{supplier.name}</td>
                <td className='text-center p-1'>{supplier.phone}</td>
                <td className='text-center p-1'>{supplier.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShowSupplier;
