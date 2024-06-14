import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { contentsm } from '../../redux/action';
import Stock from '../stock/Stock';
import { useDispatch } from 'react-redux';

function Vente() {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchpro, setSearchpro] = useState("");
  const [ClientsName, setClientsName] = useState(null);
  const [clientsid, setClientsid] = useState(null);
  const [qttc, setQttc] = useState([]);
  const [qttp, setQttp] = useState([]);
  const [qtt, setQtt] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [price, setPrice] = useState([]);
  const dispatch = useDispatch();

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

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/Vente/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchClients();
    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredClientsResult = clients.filter(client =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.id.toString().includes(searchQuery) ||
      client.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredClients(filteredClientsResult);
  }, [searchQuery, clients]);

  useEffect(() => {
    const filteredProductsResult = products.filter(product =>
      product.name.toLowerCase().includes(searchpro.toLowerCase()) ||
      product.id.toString().includes(searchpro)
    );
    setFilteredProducts(filteredProductsResult);
  }, [searchpro, products]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchChangepro = (event) => {
    setSearchpro(event.target.value);
  };

  const handleClientSelect = (clientId, clientName) => {
    setClientsid(clientId);
    setClientsName(clientName);
  };

  const handleProductSelect = (productId) => {
    if (selectedProducts.includes(productId)) {
      const index = selectedProducts.indexOf(productId);
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
      setQttc(qttc.filter((_, idx) => idx !== index));
      setQttp(qttp.filter((_, idx) => idx !== index));
      setPrice(price.filter((_, idx) => idx !== index));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
      setQttc([...qttc, 0]);
      setQttp([...qttp, 0]);
      setPrice([...price, 0]);
    }
  };

  const changeContent = (cont) => {
    document.getElementById('Clients').style.display = 'none';
    document.getElementById('Products').style.display = 'none';
    document.getElementById('Quantity').style.display = 'none';
    document.getElementById(cont).style.display = 'block';
  };

  const send = () => {
    const calculatedQtt = qttc.map((qttCarton, index) => 
      qttCarton * products.find(p => p.id === selectedProducts[index]).qtt_piece_in_carton + qttp[index]
    );

    const data = {
      client: clientsid,
      qtt: calculatedQtt,
      products: selectedProducts,
      price: price,
    };

    console.log('Data being sent:', data); // Debug log

    axios.post('http://127.0.0.1:8000/api/Vente', data)
      .then(res => {
        if (res.data === true) {
          dispatch(contentsm(<Stock />));
        }
      })
      .catch(err => {
        console.log('Error:', err);
      });
  };

  return (
    <div className='justify-start flex mt-14'>
      <div className="flex flex-col items-center bg-gray-100 w-full p-4 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Vente</h2>
        <div className="flex w-full justify-start mb-5">
          <button onClick={() => changeContent('Clients')} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md">Clients</button>
          <button onClick={() => changeContent('Products')} className="px-4 mr-2 py-2 bg-blue-500 text-white rounded-md">Products</button>
          <button onClick={() => changeContent('Quantity')} className="px-4 py-2 bg-blue-500 text-white rounded-md">Quantity</button>
        </div>
        <div id='Clients' className='w-full flex flex-col items-center'>
          <div className="mb-10">
            <input
              type="text"
              placeholder="Search Clients..."
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
                <th>City</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map(client => (
                <tr key={client.id}>
                  <td className='text-center p-1'>{client.id}</td>
                  <td className='text-center p-1'>{client.name}</td>
                  <td className='text-center p-1'>{client.city}</td>
                  <td className='text-center p-1'>
                    <button
                      className={`px-4 py-2 rounded text-white ${clientsid === client.id ? 'bg-green-500' : 'bg-blue-700'}`}
                      onClick={() => handleClientSelect(client.id, client.name)}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div id='Products' className='w-full flex-col hidden items-center'>
          <div className="mb-10">
            <input
              type="text"
              placeholder="Search Products..."
              value={searchpro}
              onChange={handleSearchChangepro}
              className="px-4 py-2 border rounded-lg"
            />
          </div>
          <table className="w-full justify-center">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity Piece in Carton</th>
                <th>Quantity Carton</th>
                <th>Quantity Piece</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td className='text-center p-1'>{product.id}</td>
                  <td className='text-center p-1'>{product.name}</td>
                  <td className='text-center p-1'>{product.price}</td>
                  <td className='text-center p-1'>{product.qtt_piece_in_carton}</td>
                  <td className='text-center p-1'>{Math.floor(product.quantity / product.qtt_piece_in_carton)}</td>
                  <td className='text-center p-1'>{product.quantity % product.qtt_piece_in_carton}</td>
                  <td className='text-center p-1'>
                    <button
                      className={`px-4 py-2 rounded text-white ${selectedProducts.includes(product.id) ? 'bg-green-500' : 'bg-blue-700'}`}
                      onClick={() => handleProductSelect(product.id)}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div id='Quantity' className='w-full flex-col hidden items-center'>
          <div className='mt-10 mb-10 w-full flex'>
            <div className='w-3/4'>
              <h1>Client: <span>{ClientsName}</span></h1>
            </div>
            <div className="flex justify-end mb-5 w-1/4 ">
              <button onClick={send} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md">Valider</button>
            </div>
          </div>
          <table className="w-full justify-center">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity Piece in Carton</th>
                <th>Quantity Carton</th>
                <th>Quantity Piece</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product, index) => (
                <tr key={product}>
                  <td className='text-center p-1'>{product}</td>
                  <td className='text-center p-1'>{products.find(p => p.id === product)?.name}</td>
                  <td className='text-center p-1'>{products.find(p => p.id === product)?.price}</td>
                  <td className='text-center p-1'>{products.find(p => p.id === product)?.qtt_piece_in_carton}</td>
                  <td className='text-center p-1'>
                    <input
                      type='number'
                      value={qttc[index]}
                      onChange={(e) => {
                        const newQttc = [...qttc];
                        newQttc[index] = parseInt(e.target.value);
                        setQttc(newQttc);
                      }}
                    />
                  </td>
                  <td className='text-center p-1'>
                    <input
                      type='number'
                      value={qttp[index]}
                      onChange={(e) => {
                        const newQttp = [...qttp];
                        newQttp[index] = parseInt(e.target.value);
                        setQttp(newQttp);
                      }}
                    />
                  </td>
                  <td className='text-center p-1'>
                    <input
                      type='number'
                      value={price[index]}
                      onChange={(e) => {
                        const newPrice = [...price];
                        newPrice[index] = parseFloat(e.target.value);
                        setPrice(newPrice);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Vente;
