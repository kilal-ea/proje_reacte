import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/login';
import Dashboard from './dash/dash';

function App() {

  const [route,setroute]=useState('')

  const user = localStorage.getItem('user');
useEffect(() => {
  if (user) {
    setroute(
     <>
         <Route path="/" element={<Dashboard />} />
         <Route path="/dashboard" element={<Dashboard />} />
      </>
    )
  }
  else{
    setroute(
      <>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Login />} />
      </>
    )
  } 
});

  return (
    <Router>
      <div className="App">
        <Routes>
           {route}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
