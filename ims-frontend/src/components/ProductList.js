import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/products/${id}/`)
      .then(response => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h1>Product List</h1>
      <ul className="list-group">
        {products.map(product => (
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {product.name} - Quantity: {product.quantity}, Price: ${product.price}
            </div>
            <div>
              <Link to={`/edit/${product.id}`} className="btn btn-warning btn-sm mr-2">Edit</Link>
              <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm">Delete</button>
              <Link to={`/sell/${product.id}`} className="btn btn-success btn-sm ml-2">Sell</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;