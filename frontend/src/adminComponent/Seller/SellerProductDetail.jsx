import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SellerDetail() {
  const [products, setProducts] = useState([]);

  console.log("✌️products --->", products);

  const { id } = useParams();
  console.log("✌️id 1@@@@@@@@@@@@@@@@@@@@@2--->", id);

  const navigate = useNavigate();

  // Fetch cart products for the seller
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Token:", token); // This should print the token
    axios
      .get(`http://localhost:8000/Seller/getProductDetails/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
      .then((response) => {
        console.log("API Response get all prouduct:", response.data); // Debug statement to check API response
        setProducts([response.data.product]); // Wrap the product object in an array
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [id]);

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
      <h2 className="text-3xl font-bold">Seller Details</h2>
      <div className="mt-3 text-sm">Check the details of the seller</div>
      <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
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
    </div>
  );
}
