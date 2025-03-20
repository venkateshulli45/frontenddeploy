import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  

  const api_url = 'http://localhost:5000';
  // Fetch all products
  useEffect(() => {
    axios.get(`${api_url}/api/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Add a product
  const addProduct = () => {
    if (!name || !price) {
      alert('Please fill in all fields');
      return;
    }
    axios.post(`${api_url}/api/products`, { name, price })
      .then((response) => {
        setProducts([...products, response.data]);
        setName('');
        setPrice('');
      })
      .catch((error) => console.error(error));
  };

  // Delete a product
  const deleteProduct = (id) => {
    axios.delete(`${api_url}/api/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="app">
      <h1>Product Manager</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <span>{product.name} - ${product.price}</span>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
