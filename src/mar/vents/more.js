import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function More() {
  const [bon, setBon] = useState([]);
  const [pricetotal, setPricetotal] = useState(0);
  const code = useSelector((state) => state.codebon);
  const sectionRef = useRef();

  useEffect(() => {
    const requestData = { code };

    axios.post('http://127.0.0.1:8000/api/bon/details', requestData)
      .then(response => {
        setBon(response.data);
        console.log('data :' + response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [code]);

  useEffect(() => {
    const total = bon.reduce((sum, item) => sum + Number(item.price*item.quantity), 0);
    setPricetotal(total);
  }, [bon]);

  const handlePrint = () => {
    document.getElementById('h1').style.display = 'block';
    // Add a print stylesheet
    const printStyles = `
      @media print {
        body * {
          visibility: hidden;
        }
        #printSection, #printSection * {
          visibility: visible;
        }
        #printSection {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #000;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        .no-print {
          display: none;
        }
        .hide-on-print {
          display: none !important;
        }
      }
    `;
  
    // Create a style element and add the print styles
    const styleElement = document.createElement('style');
    styleElement.innerHTML = printStyles;
    document.head.appendChild(styleElement);
  
    // Get the current date and time
    const currentDate = new Date().toLocaleString('en-US');
  
    // Get the contents to print
    const printContents = `
      <div id="printSection">
        <h1>Bon Vente</h1>
        <div class="print-header">
          <span class="print-date">Date Printed: ${currentDate}</span>
        </div>
        ${sectionRef.current.innerHTML}
      </div>
    `;
  
    // Save the original contents of the body
    const originalContents = document.body.innerHTML;
  
    // Create a new div for printing
    const printSection = document.createElement('div');
    printSection.innerHTML = printContents;
    document.body.innerHTML = '';
    document.body.appendChild(printSection);
  
    // Print the page
    window.print();
  
    // Restore the original contents of the body
    document.body.innerHTML = originalContents;
  
    // Remove the print styles
    document.head.removeChild(styleElement);
    document.getElementById('h1').style.display = 'none';
    // Optionally, reload the page to reset the state
    window.location.reload();
  };
  
  
  

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white border-b rounded-xl">
            <div className='flex justify-center p-3'>
              <h1 className='text-2xl text-black font-bold'>Bon Vente</h1>
            </div>
            <div className='p-5 flex'>
              <div className='w-4/5'>
                <h1 className='text-sm font-medium text-black'>Code: <span className='text-gray-700'>{code}</span></h1>
                <h1 className='text-sm font-medium text-black'>Client: {bon.length > 0 && <span className='text-gray-700'>{bon[0].nameclients}</span>}</h1>
              </div>
              <div className='w-1/5 flex justify-center'>
                <button onClick={handlePrint} className='bg-blue-700 text-white px-6 py-2 rounded-lg'>Print</button>
              </div>
            </div>
            <div ref={sectionRef}>
              <div>
              <div id='h1' className='w-4/5 p-5 hidden'>
                <h1 className='text-sm font-medium text-black'>Code: <span className='text-gray-700'>{code}</span></h1>
                <h1 className='text-sm font-medium text-black'>Client: {bon.length > 0 && <span className='text-gray-700'>{bon[0].nameclients}</span>}</h1>
              </div>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-sm text-center font-medium text-gray-900 px-6 py-4">ID</th>
                      <th className="text-sm text-center font-medium text-gray-900 px-6 py-4">Name</th>
                      <th className="text-sm text-center font-medium text-gray-900 px-6 py-4">Quantity</th>
                      <th className="text-sm text-center font-medium text-gray-900 px-6 py-4">Price</th>
                      <th className="text-sm text-center font-medium text-gray-900 px-6 py-4">Price total</th>

                    </tr>
                  </thead>
                  <tbody>
                    {bon.map((bonItem, index) => (
                      <tr key={index}>
                        <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{bonItem.id}</td>
                        <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{bonItem.name}</td>
                        <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{bonItem.quantity}</td>
                        <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{bonItem.price}</td>
                        <td className="text-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{bonItem.price*bonItem.quantity}</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='p-5 flex'>
                <div className='w-4/5'>
                  <h1 className='text-3xl text-black'>Price Total:</h1>
                </div>
                <div className='w-1/5 flex justify-center'>
                  <h1 className='text-3xl text-gray-600'>{pricetotal}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default More;
