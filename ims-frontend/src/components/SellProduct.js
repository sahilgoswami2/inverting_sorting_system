import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function SellProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}/`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8000/api/products/${id}/sell/`, { quantity })
      .then(response => {
        console.log('Product sold:', response.data);
        // Assuming the backend handles adding the sold product to the sold products list
        navigate('/sold-products'); // Redirect to the sold products list
      })
      .catch(error => {
        console.error('Error selling product:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Sell Product</h1>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="form-group">
          <label htmlFor="quantity">Quantity to Sell</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            required
          />
          <div className="invalid-feedback">Please enter a quantity.</div>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Sell Product
        </button>
      </form>
    </div>
  );
}

export default SellProduct;