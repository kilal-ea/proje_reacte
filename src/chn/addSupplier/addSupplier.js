import axios from 'axios';
import React, { useState } from 'react';

function Addsup() {
  // State variables for supplier details
  const [supplierName, setSupplierName] = useState('');
  const [supplierPhone, setSupplierPhone] = useState('');
  const [supplierEmail, setSupplierEmail] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const supplierData = {
      name: supplierName,
      phone: supplierPhone,
      email: supplierEmail
    };
    axios.post('http://127.0.0.1:8000/api/supplierData', supplierData)
      .then(response => {
        console.log("msg", response.data);
      })
      .catch(err => {
        console.log(err);
      });
    // Reset form fields
    setSupplierName('');
    setSupplierPhone('');
    setSupplierEmail('');
  };

  return (
    <div className='justify-center flex mt-14'>
      <div className="flex flex-col items-center bg-gray-100 w-1/2 p-4 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Add Supplier</h2>
        <form onSubmit={handleSubmit} className="max-w-md w-full">
          <div className="mb-4">
            <label htmlFor="supplierName" className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              id="supplierName"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="supplierPhone" className="block text-gray-700 font-medium mb-2">Phone</label>
            <input
              type="tel"
              id="supplierPhone"
              value={supplierPhone}
              onChange={(e) => setSupplierPhone(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="supplierEmail" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="supplierEmail"
              value={supplierEmail}
              onChange={(e) => setSupplierEmail(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
            Add Supplier
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addsup;
