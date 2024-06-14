import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarehouse, faPlus, faUserPlus, faUsers, faTruck , faMoneyBill } from '@fortawesome/free-solid-svg-icons'; // Import the necessary icons
import Stock from '../chn/stock/Stock'
import Addpro from '../chn/addproduit/addproduit'
import Addsup from '../chn/addSupplier/addSupplier';
import ShowSupplier from '../chn/addSupplier/showSupplier';
import Transaction from '../chn/Transaction/Transaction';
import Transactionsbon from '../chn/Transaction/Transactionbon';
import { useDispatch, useSelector } from 'react-redux';
import { contentsc } from '../redux/action';

function Dashc() {
  const content = useSelector(state => state.contentc);
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mouseOverSidebar, setMouseOverSidebar] = useState(false);
  const [showIcons, setShowIcons] = useState(true);



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

  const showStock = () => {
    dispatch(contentsc(<Stock/>)); 
  };

  const showAddProducts = () => {
    dispatch(contentsc(<Addpro/>)); 
  };

  const showaddFornesuer = () => {
    dispatch(contentsc(<Addsup/>));
  };

  const showallFornesuer = () => {
    dispatch(contentsc(<ShowSupplier/>));
  };

  const showTransaction = () => {
    dispatch(contentsc(<Transaction/>));
  };

  const showBon = () => {
    dispatch(contentsc(<Transactionsbon/>));
  };

  return (
    <div className='flex'>
      <aside
        className={`w-1/4 bg-gray-900 text-white flex flex-col p-4 shadow-lg transition-width duration-300 ${sidebarOpen || mouseOverSidebar ? 'w-1/4' : 'w-24'}`}
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
          onClick={showAddProducts}
          className="bg-blue-500 text-white py-2 px-4 text-lg rounded mt-2 mb-2 hover:bg-blue-600 transition-transform duration-300 hover:scale-105 shadow-md"
        >
          {showIcons ? <FontAwesomeIcon icon={faPlus} /> : 'Add Products'}
        </button>
        <button
          onClick={showaddFornesuer}
          className="bg-blue-500 text-white py-2 px-4 text-lg rounded mt-2 mb-2 hover:bg-blue-600 transition-transform duration-300 hover:scale-105 shadow-md"
        >
          {showIcons ? <FontAwesomeIcon icon={faUserPlus} /> : 'Add Supplier'}
        </button>
        <button
          onClick={showallFornesuer}
          className="bg-blue-500 text-white py-2 px-4 text-lg rounded mt-2 mb-2 hover:bg-blue-600 transition-transform duration-300 hover:scale-105 shadow-md"
        >
          {showIcons ? <FontAwesomeIcon icon={faUsers} /> : 'Show Supplier'}
        </button>
        <button
          onClick={showTransaction}
          className="bg-blue-500 text-white py-2 px-4 text-lg rounded mt-2 mb-2 hover:bg-blue-600 transition-transform duration-300 hover:scale-105 shadow-md"
        >
          {showIcons ? <FontAwesomeIcon icon={faTruck} /> : 'Transaction'}
        </button>
        <button
          onClick={showBon}
          className="bg-blue-500 text-white py-2 px-4 text-lg rounded mt-2 mb-2 hover:bg-blue-600 transition-transform duration-300 hover:scale-105 shadow-md"
        >
          {showIcons ? <FontAwesomeIcon icon={faMoneyBill} /> : 'Bon'}
        </button>
      </aside>
      <div className='h-screen w-full px-10'>
        {content}
      </div>
    </div>
  );
}

export default Dashc;
