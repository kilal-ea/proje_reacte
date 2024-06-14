import axios from 'axios';
import React, { useState } from 'react';
import Select from 'react-select';

const cities = [
  { label: "Agadir", value: "Agadir" },
  { label: "Ahfir", value: "Ahfir" },
  { label: "Ait Melloul", value: "Ait Melloul" },
  { label: "Al Hoceima", value: "Al Hoceima" },
  { label: "Asilah", value: "Asilah" },
  { label: "Azemmour", value: "Azemmour" },
  { label: "Azilal", value: "Azilal" },
  { label: "Aïn Harrouda", value: "Aïn Harrouda" },
  { label: "Béni Mellal", value: "Béni Mellal" },
  { label: "Berkane", value: "Berkane" },
  { label: "Berrechid", value: "Berrechid" },
  { label: "Boujdour", value: "Boujdour" },
  { label: "Bouznika", value: "Bouznika" },
  { label: "Casablanca", value: "Casablanca" },
  { label: "Chefchaouen", value: "Chefchaouen" },
  { label: "Chichaoua", value: "Chichaoua" },
  { label: "Dakhla", value: "Dakhla" },
  { label: "Drargua", value: "Drargua" },
  { label: "El Aioun Sidi Mellouk", value: "El Aioun Sidi Mellouk" },
  { label: "El Gara", value: "El Gara" },
  { label: "El Jadida", value: "El Jadida" },
  { label: "El Kelaa des Sraghna", value: "El Kelaa des Sraghna" },
  { label: "Errachidia", value: "Errachidia" },
  { label: "Essaouira", value: "Essaouira" },
  { label: "Fes", value: "Fes" },
  { label: "Fnideq", value: "Fnideq" },
  { label: "Fquih Ben Salah", value: "Fquih Ben Salah" },
  { label: "Guelmim", value: "Guelmim" },
  { label: "Guercif", value: "Guercif" },
  { label: "Ifrane", value: "Ifrane" },
  { label: "Imzouren", value: "Imzouren" },
  { label: "Jerada", value: "Jerada" },
  { label: "Kelaat Mgouna", value: "Kelaat Mgouna" },
  { label: "Khemisset", value: "Khemisset" },
  { label: "Khenifra", value: "Khenifra" },
  { label: "Khouribga", value: "Khouribga" },
  { label: "Kenitra", value: "Kenitra" },
  { label: "Ksar El Kebir", value: "Ksar El Kebir" },
  { label: "Laayoune", value: "Laayoune" },
  { label: "Larache", value: "Larache" },
  { label: "Marrakesh", value: "Marrakesh" },
  { label: "Martil", value: "Martil" },
  { label: "Mehdia", value: "Mehdia" },
  { label: "Meknes", value: "Meknes" },
  { label: "Midelt", value: "Midelt" },
  { label: "Mohammedia", value: "Mohammedia" },
  { label: "Nador", value: "Nador" },
  { label: "Ouarzazate", value: "Ouarzazate" },
  { label: "Ouazzane", value: "Ouazzane" },
  { label: "Oued Zem", value: "Oued Zem" },
  { label: "Oujda", value: "Oujda" },
  { label: "Rabat", value: "Rabat" },
  { label: "Safi", value: "Safi" },
  { label: "Salé", value: "Salé" },
  { label: "Sefrou", value: "Sefrou" },
  { label: "Settat", value: "Settat" },
  { label: "Sidi Bennour", value: "Sidi Bennour" },
  { label: "Sidi Ifni", value: "Sidi Ifni" },
  { label: "Sidi Kacem", value: "Sidi Kacem" },
  { label: "Sidi Slimane", value: "Sidi Slimane" },
  { label: "Skhirat", value: "Skhirat" },
  { label: "Souk El Arbaa", value: "Souk El Arbaa" },
  { label: "Tan-Tan", value: "Tan-Tan" },
  { label: "Tanger", value: "Tanger" },
  { label: "Taourirt", value: "Taourirt" },
  { label: "Tarfaya", value: "Tarfaya" },
  { label: "Taroudant", value: "Taroudant" },
  { label: "Taza", value: "Taza" },
  { label: "Temara", value: "Temara" },
  { label: "Tetouan", value: "Tetouan" },
  { label: "Tinghir", value: "Tinghir" },
  { label: "Tiznit", value: "Tiznit" },
  { label: "Youssoufia", value: "Youssoufia" }
];

function Addclients() {
  // State variables for client details
  const [ClientName, setClientName] = useState('');
  const [ClientPhone, setClientPhone] = useState('');
  const [ClientEmail, setClientEmail] = useState('');
  const [ClientCity, setClientCity] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const clients = {
      name: ClientName,
      phone: ClientPhone,
      email: ClientEmail,
      city: ClientCity,
    };
    
    axios.post('http://127.0.0.1:8000/api/clients/add', clients)
      .then(response => {
        console.log("msg", response.data);
      })
      .catch(err => {
        console.log(err);
      });
    // Reset form fields
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setClientCity('');
  };

  return (
    <div className='justify-center flex mt-3'>
      <div className="flex flex-col items-center bg-gray-100 w-1/2 p-4 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Add Client</h2>
        <form onSubmit={handleSubmit} className="max-w-md w-full">
          <div className="mb-4">
            <label htmlFor="clientName" className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              id="clientName"
              value={ClientName}
              onChange={(e) => setClientName(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clientPhone" className="block text-gray-700 font-medium mb-2">Phone</label>
            <input
              type="tel"
              id="clientPhone"
              value={ClientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clientEmail" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="clientEmail"
              value={ClientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clientCity" className="block text-gray-700 font-medium mb-2">City</label>
            <Select
              id="clientCity"
              options={cities}
              value={cities.find(city => city.value === ClientCity)}
              onChange={(selectedOption) => setClientCity(selectedOption.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
            Add Client
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addclients;
