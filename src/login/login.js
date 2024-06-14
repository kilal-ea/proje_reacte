import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    axios.post('http://127.0.0.1:8000/api/user', userData)
      .then((response) => {
        if (response.data.msg === true) {
          console.log(response.data.msg );
          localStorage.setItem("user", JSON.stringify(response.data.user)); // Change sessionStorage to localStorage
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-sky-200">
        <div className="bg-white rounded-xl shadow-md w-1/3 px-10 py-6">
          <div className='text-center'>
            <h1 className="text-3xl font-semibold text-blue-600 mb-8">
              Login
            </h1>
          </div>
          <form onSubmit={handleSubmit} className='w-full'>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
