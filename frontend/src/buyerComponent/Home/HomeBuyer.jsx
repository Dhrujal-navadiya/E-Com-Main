import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { jwtDecode } from "jwt-decode"; // Correct import statement
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../../Redux/feature/ProductSlice";

export default function HomeBuyer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle error
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("accessToken");
      console.log("Token:", token); // This should print the token

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log("Decoded Token:", decodedToken); // Debug statement to check decoded token

          const response = await axios.get(
            "http://localhost:8000/api/getAllProduct",
            {
              headers: {
                "Content-Type": "application/json", // Use application/json for a typical REST API
                Authorization: token,
              },
            }
          );

          console.log("API Response:", response.data); // Debug statement to check API response
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
          setError(error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No token found");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId, product, sellerId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8000/Buyercart/cartProduct",
        {
          Product: productId,
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image,
          totalPrice: product.totalPrice,
          totalItem: product.totalItem,
          totalDiscountPrice: product.totalDiscountPrice,
          discount: product.discount,
          quantity: product.quantity,
          status: "Pending",
          seller: sellerId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      console.log("Product added to cart:", response.data);
      setToggle(!toggle);
      // Here you can update the UI or take any additional actions
    } catch (error) {
      console.error("Error adding product to cart:", error);
      // Handle error, e.g., show a message to the user
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div>Error fetching products: {error.message}</div>; // Display error state
  }

  return (
    <div>
      <Navbar height="h-24" toggle={toggle} />
      <div className="flex flex-wrap mt-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-64 h-96 mx-4 mb-4"
            style={{ minHeight: "300px", maxHeight: "300px" }}
          >
            <div className="relative mx-2 mt-2 overflow-hidden">
              <img
                src={`http://localhost:8000/${product.image}`}
                alt="card-image"
                className="object-cover object-top w-full h-full"
                style={{ overflow: "hidden" }}
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="block font-sans text-sm antialiased font-medium leading-relaxed text-blue-gray-900">
                  {product.name}
                </p>
                <p className="block font-sans text-sm antialiased font-medium leading-relaxed text-blue-gray-900">
                  ${product.price}
                </p>
              </div>
              <p className="block font-sans text-xs antialiased font-normal leading-normal text-gray-700 opacity-75">
                {product.description}
              </p>
            </div>
            <div className="p-4 pt-0">
              <button
                onClick={() =>
                  handleAddToCart(product._id, product, product.seller)
                }
                className="hover:bg-slate-200 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                type="button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
