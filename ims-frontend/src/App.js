import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import EditProduct from "./components/EditProduct";
import SellProduct from "./components/SellProduct";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css"; // Import custom CSS
import SoldProducts from "./components/SoldProducts";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <AuthHandler setIsAuthenticated={setIsAuthenticated} />
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            Inventory Management
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Product List
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">
                  Add Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sold-products">
                  Sold Products
                </Link>
              </li>
              {!isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
              {isAuthenticated && (
                <li className="nav-item">
                  <LogoutButton setIsAuthenticated={setIsAuthenticated} />
                </li>
              )}
            </ul>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <ProductList />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/add"
            element={
              isAuthenticated ? (
                <ProductForm />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/edit/:id"
            element={
              isAuthenticated ? (
                <EditProduct />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/sell/:id"
            element={
              isAuthenticated ? (
                <SellProduct />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/sold-products"
            element={
              isAuthenticated ? (
                <SoldProducts />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

function AuthHandler({ setIsAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus) {
      setIsAuthenticated(true);
    } else {
      navigate("/login");
    }
  }, [navigate, setIsAuthenticated]);

  return null;
}

function LogoutButton({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <button className="nav-link btn btn-link" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default App;
