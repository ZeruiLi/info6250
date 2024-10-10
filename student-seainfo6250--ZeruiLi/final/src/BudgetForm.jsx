import React, { useState } from 'react';

function BudgetForm({ onSetBudget }) {
  const [inputBudget, setInputBudget] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();  
    if (!inputBudget.trim()) return;  
    onSetBudget(parseFloat(inputBudget));  
    setInputBudget(''); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Set your budget"
        value={inputBudget}
        onChange={(e) => setInputBudget(e.target.value)}
      />
      <button type="submit">Set Budget</button>
    </form>
  );
}

export default BudgetForm;
