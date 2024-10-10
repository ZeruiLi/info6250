
import React from 'react';

function CategoryData({ todos }) {
  const categoryTotals = {};
  const categoryPercentages = {};
  let totalSpent = 0;

  todos.forEach(todo => {
    if (categoryTotals[todo.category]) {
      categoryTotals[todo.category] += parseFloat(todo.price);
    } else {
      categoryTotals[todo.category] = parseFloat(todo.price);
    }
    totalSpent += parseFloat(todo.price);
  });

  Object.keys(categoryTotals).forEach(category => {
    categoryPercentages[category] = ((categoryTotals[category] / totalSpent) * 100).toFixed(2) + '%';
  });

  return (
    <div>
      <h3>Category Expense Totals</h3>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total Spent</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(categoryTotals).map(category => (
            <tr key={category}>
              <td>{category}</td>
              <td>${categoryTotals[category].toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Category Expense Percentages</h3>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Percentage of Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(categoryPercentages).map(category => (
            <tr key={category}>
              <td>{category}</td>
              <td>{categoryPercentages[category]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryData;
