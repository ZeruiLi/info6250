import { useState } from 'react';

function AddTodoForm({ onAddTodo }) {
  const [goods, setGoods] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('others'); 
  function onSubmit(e) {
    e.preventDefault(); 
    if (!goods.trim() || !price.trim()) return;  
    onAddTodo({
      goods: goods.trim(),
      price: parseFloat(price) || 0,  
      category
    });
    setGoods('');  
    setPrice(''); 
    setCategory('others'); 
  }

  function onGoodsChange(e) {
    setGoods(e.target.value);
  }

  function onPriceChange(e) {
    setPrice(e.target.value);
  }

  return (
    <form className="add__form" action="#/add" onSubmit={onSubmit}>
      <input
        className="add__goods"
        value={goods}
        onChange={onGoodsChange}
        placeholder="Enter goods"
      />
      <input
        type="number"
        className="add__price"
        value={price}
        onChange={onPriceChange}
        placeholder="Enter price"
      />
       <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="foods">Foods</option>
        <option value="drinks">Drinks</option>
        <option value="others">Others</option>
      </select>
      <button type="submit" className="add__button">Add</button>
    </form>
  );
}

export default AddTodoForm;
