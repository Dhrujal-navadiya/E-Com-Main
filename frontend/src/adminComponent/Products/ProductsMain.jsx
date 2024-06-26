import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import statement
import axios from "axios";

export default function HomeBuyer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

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
          setLoading(false); // Set loading to false once the fetch is complete
        }
      } else {
        console.log("No token found");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error fetching products.
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        No products available.
      </div>
    );
  }
  return (
    <div>
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
          </div>
        ))}
      </div>
    </div>
  );
}
