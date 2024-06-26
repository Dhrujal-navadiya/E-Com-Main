import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdAddCircle, MdShoppingCart } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import ProductForm from "../ProductForm/ProductForm";
import ViewProduct from "../ViewProduct/ViewProduct";
import ViewCart from "../ViewCart/ViewCart";
import "./Seller.css";

export default function Seller() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "seller") {
      console.log(role, "not seller or admin");
      navigate("/login");
    }
  }, [navigate]);

  const [isAddFormOpen, setIsAddFormOpen] = useState(true);
  const [isViewProductOpen, setIsViewProductOpen] = useState(false);
  const [isViewCartOpen, setIsViewCartOpen] = useState(false);

  const openAddForm = () => {
    setIsViewProductOpen(false);
    setIsViewCartOpen(false);
    setIsAddFormOpen(true);
  };
  const closeAddForm = () => setIsAddFormOpen(false);

  const openViewProduct = () => {
    setIsAddFormOpen(false);
    setIsViewCartOpen(false);
    setIsViewProductOpen(true);
  };
  const closeViewProduct = () => setIsViewProductOpen(false);

  const openViewCart = () => {
    setIsAddFormOpen(false);
    setIsViewProductOpen(false);
    setIsViewCartOpen(true);
  };
  const closeViewCart = () => setIsViewCartOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-gray-200 p-4">
        <form className="flex justify-start gap-4">
          <button
            className="flex items-center gap-2 btn btn-outline-success border-black hover:bg-gray-300"
            type="button"
            onClick={openAddForm}
          >
            <MdAddCircle />
            <span>Add To Product</span>
          </button>
          <button
            className="flex items-center gap-2 btn btn-outline-secondary border-black hover:bg-gray-300"
            type="button"
            onClick={openViewProduct}
          >
            <IoEye />
            <span>View Products</span>
          </button>
          <button
            className="flex items-center gap-2 btn btn-outline-secondary border-black hover:bg-gray-300"
            type="button"
            onClick={openViewCart}
          >
            <MdShoppingCart />
            <span>View Cart</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 btn btn-outline-secondary border-black hover:bg-gray-300"
            type="button"
          >
            Logout
          </button>
        </form>
      </nav>
      {isAddFormOpen && (
        <div className="overlay">
          <div className="form-container medium-form">
            <ProductForm onClose={closeAddForm} />
          </div>
        </div>
      )}
      {isViewProductOpen && (
        <div className="overlay">
          <div className="form-container medium-form">
            <ViewProduct onClose={closeViewProduct} />
          </div>
        </div>
      )}
      {isViewCartOpen && (
        <div className="overlay">
          <div className="form-container medium-form">
            <ViewCart onClose={closeViewCart} />
          </div>
        </div>
      )}
    </>
  );
}
