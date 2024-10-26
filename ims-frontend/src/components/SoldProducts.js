import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SoldProducts() {
  const [soldProducts, setSoldProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/sold-products/')
      .then(response => {
        setSoldProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching sold products:', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Sold Products</h1>
      {soldProducts.length > 0 ? (
        <ul className="list-group">
          {soldProducts.map((soldProduct, index) => (
            <li key={index} className="list-group-item">
              {soldProduct.product_name} - Quantity: {soldProduct.quantity} - Sold At: {new Date(soldProduct.sold_at).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No products sold yet.</p>
      )}
    </div>
  );
}

export default SoldProducts;