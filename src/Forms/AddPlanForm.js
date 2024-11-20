import React, { useState, useEffect } from 'react';
import "./AddPlanForm.css";

const AddPlanForm = () => {
  const [name, setName] = useState('');
  const [priceDrop, setPriceDrop] = useState('');
  const [savings, setSavings] = useState('');
  const [oldAmount, setOldAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  // Function to calculate price drop and savings
  const calculatePrices = () => {
    // Ensure oldAmount and priceDrop are numeric without '₹'
    const old = parseFloat(oldAmount || 0);
    const drop = parseFloat(priceDrop || 0);

    const total = old - drop; // Calculate the total amount after applying the price drop
    const saved = old - total; // Savings is the difference between old and total

    // Convert values to strings with ₹ symbol
    setTotalAmount(`₹${total.toFixed(2)}`);
    setSavings(`₹${saved.toFixed(2)}`);
  };

  // Function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only the name should be stored directly, other values are calculated
    const newPlan = {
      name,
      priceDrop, // Price drop without ₹ symbol
      savings,   // Savings with ₹ symbol (calculated)
      oldAmount, // Old amount without ₹ symbol
      totalAmount, // Total amount with ₹ symbol (calculated)
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/addPlan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlan)
      });

      if (response.ok) {
        const data = await response.json();
        alert('Plan added successfully!');
        // Clear the form after submission
        setName('');
        setPriceDrop('');
        setOldAmount('');
        setTotalAmount('');
        setSavings('');
      } else {
        alert('Failed to add the plan');
      }
    } catch (error) {
      console.error('Error adding plan:', error);
    }
  };

  // Effect to calculate prices whenever oldAmount or priceDrop changes
  useEffect(() => {
    if (oldAmount && priceDrop) {
      calculatePrices();
    }
  }, [oldAmount, priceDrop]);

  return (
    <div className="add-plan-form">
      <h2>Add New Subscription Plan</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Plan Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Old Amount (₹):</label>
          <input
            type="number"
            value={oldAmount}
            onChange={(e) => setOldAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price Drop (₹):</label>
          <input
            type="number"
            value={priceDrop}
            onChange={(e) => setPriceDrop(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Total Amount (₹):</label>
          <input
            type="text"
            value={totalAmount}
            disabled // Disabled since it's automatically calculated
          />
        </div>
        <div>
          <label>Savings (₹):</label>
          <input
            type="text"
            value={savings}
            disabled // Disabled since it's automatically calculated
          />
        </div>
        <button type="submit">Add Plan</button>
      </form>
    </div>
  );
};

export default AddPlanForm;
