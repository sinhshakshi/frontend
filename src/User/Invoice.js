import React, { useEffect, useState } from 'react';
import './Invoice.css';
import { useCookies } from 'react-cookie';
import pic from '../i/exambook.png';

const Invoice = () => {
  const [cookies] = useCookies(['session_id', 'SSIDCE']);
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/typing-purchase`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.session_id}`,
          },
          body: JSON.stringify({ emailId: cookies.SSIDCE }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch invoice data');
        }

        const data = await response.json();
        setInvoiceData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
        setLoading(false);
      }
    };

    fetchInvoiceData();
  }, [cookies.session_id, cookies.SSIDCE]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!invoiceData) {
    return <div>No invoice data available.</div>;
  }

  const gstAmount = (invoiceData.amountPaid * 13) / 100;
  const totalAmount = invoiceData.amountPaid + gstAmount;

  return (
    <div className="invoice-container">
      <header className="invoice-header">
        <div className="invoice-logo">
        <img src={pic} alt="Moonstream Logo" className="invoice-logo-pic" />
          {/* <p>148 Northern Street, New York</p> */}
        </div>
        <div className="invoice-info">
          <h2>INVOICE</h2>
          <p>Invoice # {invoiceData.orderId}</p>
        </div>
      </header>

      <div className="invoice-address">
        <div>
          <h4>Bill To:</h4>
          <p>{invoiceData.emailId}</p>
        </div>
        <div>
        <p>
  <strong>Invoice Date:</strong>{" "}
  {(() => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  })()}
</p>
          <p><strong>Subscription Plan:</strong> {invoiceData.selectedPlan}</p>
        </div>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{invoiceData.selectedPlan}</td>
            <td>1</td>
            <td>₹{invoiceData.amountPaid.toFixed(2)}</td>
            <td>₹{invoiceData.amountPaid.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div className="invoice-summary">
        <div className="summary-item">
          <span>Sub Total:</span>
          <span>₹{invoiceData.amountPaid.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>GST (13%):</span>
          {/* <span>₹{gstAmount.toFixed(2)}</span> */}
        </div>
        <div className="summary-item total">
          <span>Total:</span>
          <span>₹{invoiceData.amountPaid.toFixed(2)}</span>
        </div>
      </div>

      <footer className="invoice-footer">
        <p>Thank you for choosing our service!</p>
      </footer>
    </div>
  );
};

export default Invoice;
