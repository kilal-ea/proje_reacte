import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarehouse, faClipboardList, faUserPlus, faUsers,faDollarSign,faMoneyBill , faBox } from '@fortawesome/free-solid-svg-icons'; // Import the necessary icons
import Stock from '../mar/stock/Stock';
import Transactionsbonatt from '../mar/Transaction/Transactionbonatt';
import { useDispatch, useSelector } from 'react-redux';
import { contentsm } from '../redux/action';
import Addclients from '../mar/addclients/addclients';
import ShowClients from '../mar/addclients/showclients';
import Vente from '../mar/vents/vente';
import Ventebon from '../mar/vents/ventebon';
import axios from 'axios';
import ProfitMargin from '../mar/profitMargin/profitMargin';

function Dashc() {
  const content = useSelector((state) => state.contentm);
  const dispatch = useDispatch();
  const [showIcons, setShowIcons] = useState(true);
  const [transactions, setTransactions] = useState(false);

  const showStock = () => {
    dispatch(contentsm(<Stock />));
  };

  const showbonTransactions = () => {
    dispatch(contentsm(<Transactionsbonatt />));
  };

  const showAddclients = () => {
    dispatch(contentsm(<Addclients />));
  };

  const showclients = () => {
    dispatch(contentsm(<ShowClients />));
  };

  const showVente = () => {
    dispatch(contentsm(<Vente />));
  };

  const showBon = () => {
    dispatch(contentsm(<Ventebon />));
  };

  const showProfitMargin = () => {
    dispatch(contentsm(<ProfitMargin />));
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mouseOverSidebar, setMouseOverSidebar] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/Transaction/bon/att')
      .then(response => {
        if (response.data !== null && response.data.length > 0) {
          setTransactions(true);
          document.getElementById('n1').style.display = 'block';
        } else {
          setTransactions(false);
          document.getElementById('n1').style.display = 'none';
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleMouseEnter = () => {
    setMouseOverSidebar(true);
    setSidebarOpen(true);
    setShowIcons(false);
  };

  const handleMouseLeave = () => {
    setMouseOverSidebar(false);
    // Do not close the sidebar if scrolling is still active
    if (window.pageYOffset === 0) {
      setSidebarOpen(false);
      setShowIcons(true);
    }
  };

  return (
    <div className="flex">
      <aside
        className={`w-1/4 bg-gray-900 text-white flex flex-col p-4 shadow-lg transition-width duration-300 ${
          sidebarOpen || mouseOverSidebar ? 'w-1/4' : 'w-24'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={showStock}
          className="bg-blue-500 text-white py-2 px-4 text-lg rounded mt-2 mb-2 hover:bg-blue-600 transition-transform duration-300 hover:scale-105 shadow-md"
        >
          {showIcons ? <FontAwesomeIcon  icon={faWarehouse} /> : 'Stock'}
        </button>
        <button
          onClick={showbonTransactions}
          className="bg-blue-500 text-white pb-2 pt-1 px-4 text-lg rounded mt-2 mb-2 hover:bg-blue-600  transition-transform duration-300 hover:scale-105 shadow-md"
        >
          <div id='n1' style={{ marginLeft: '100%' }} className={`bg-red-600 -mb-3   rounded-full w-3 h-3  ${transactions ? 'visible' : 'hidden'}`}></div>
          {showIcons ? <FontAwesomeIcon icon={faClipboardList} /> : "Bon's Waiting"}
        </button>
        <button
          onClick={showAddclients}
          className="bg-blue-500 text-white py-2 px-4 text-lg rounded mt-2 mb-2 hover:bg-blue-600 transition-transform duration-300 hover:scale-105 shadow-md"
        >
          {showIcons ? <FontAwesomeIcon icon={faUserPlus} /> : 'Add clients'}
        </button>
        <button
          onClick={showclients}
          className="bg-blue-500 text-white py-2 px-4 text-lg rounded mt-2 mb-2 hover:bg-blue-600 transition-transform duration-300 hover:scale-105 shadow-md"
        >
          {showIcons ? <FontAwesomeIcon icon={faUsers} /> : 'Showclients'}
        </button>
        <button
          onClick={showVente}
          className="bg-blue-500 text-white py-2 px-4 text-lg rounded mt-2 mb-2 hover:bg-blue-600 transition-transform duration-300 hover:scale-105 shadow-md"
        >
          {showIcons ? <FontAwesomeIcon icon={faBox} /> : 'Vente'}
        </button>
        <button
          onClick={showBon}
          className="bg-blue-500 text-white py-2 px-4 text-lg rounded mt-2 mb-2 hover:bg-blue-600 transition-transform duration-300 hover:scale-105 shadow-md"
        >
          {showIcons ? <FontAwesomeIcon icon={faMoneyBill} /> : 'Bon Vente'}
        </button>
        <button
          onClick={showProfitMargin}
          className="bg-blue-500 text-white py-2 px-4 text-lg rounded mt-2 mb-2 hover:bg-blue-600 transition-transform duration-300 hover:scale-105 shadow-md"
        >
          {showIcons ? <FontAwesomeIcon icon={faDollarSign} /> : 'profit Margin'}
        </button>
      </aside>
      <div className="h-screen w-full pt-10 px-10">{content}</div>
    </div>
  );
}

export default Dashc;
