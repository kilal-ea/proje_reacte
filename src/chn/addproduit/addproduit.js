import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Addpro() {
  // State variables to store form data
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantityPerCarton, setQuantityPerCarton] = useState('');
  const [quantityPiece, setQuantityPiece] = useState('');

  const [quantityCarton, setQuantityCarton] = useState('');
  const [existingSupplier, setExistingSupplier] = useState('');
  const [suppliers, setSuppliers] = useState([]);

  // Fetch suppliers on component mount
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/Supplier');
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const quantity = quantityCarton * quantityPerCarton + quantityPiece

    // Determine the supplier based on supplierType

    // Ensure numeric values are properly formatted and supplier is included
    const productData = {
        name: name,
        idstock:1,
        price: parseFloat(price),
        quantityPerCarton: parseInt(quantityPerCarton, 10),
        quantity: parseInt(quantity, 10),
        supplier: existingSupplier,
        
    };console.log(existingSupplier);

    try {
        // Sending POST request to the API
        axios.post('http://127.0.0.1:8000/api/products', productData)
        .then(response => {
          console.log('message', response.data);
        })
        .catch(err => console.log(err));

        // Reset form fields
        setName('');
        setPrice('');
        setQuantityPerCarton('');
        setQuantityCarton('');
        setExistingSupplier('');
        setQuantityPiece('');

    } catch (error) {
        // Handle error response
        console.error('There was an error adding the product:', error.response?.data || error.message);
    }
  };

  return (
    <div className='justify-center flex mt-14'>
      <div className="flex flex-col items-center bg-gray-100 w-1/2 p-4 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="max-w-md w-full">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantityPerCarton" className="block text-gray-700 font-medium mb-2">Quantity per Carton</label>
            <input
              type="number"
              id="quantityPerCarton"
              value={quantityPerCarton}
              onChange={(e) => setQuantityPerCarton(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantityPerCarton" className="block text-gray-700 font-medium mb-2">Quantity piece</label>
            <input
              type="number"
              id="quantityPiece"
              value={quantityPiece}
              onChange={(e) => setQuantityPiece(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">Quantity</label>
            <input
              type="number"
              id="quantityCarton"
              value={quantityCarton}
              onChange={(e) => setQuantityCarton(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Supplier</label>
            <div>
            </div> 
              <select
                value={existingSupplier}
                onChange={(e) => setExistingSupplier(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full mt-2"
              >
                <option value="">Select existing supplier</option>
                {suppliers.map((supplier, index) => (
                  <option key={index} value={supplier.id}>{supplier.name}</option>
                ))}
              </select>
          </div>
          <button type="submit" className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addpro;
