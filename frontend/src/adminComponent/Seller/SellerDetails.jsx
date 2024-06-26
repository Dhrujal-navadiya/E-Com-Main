import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SellerDetail() {
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch seller details by ID
  useEffect(() => {
    axios
      .get(`http://localhost:8000/Seller/getSellerById/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        setSeller(response.data);
      })
      .catch((error) => {
        console.error("Error fetching seller details:", error);
      });
  }, [id]);

  // Fetch cart products for the seller
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Token:", token); // This should print the token
    axios
      .get(`http://localhost:8000/api/getProduct/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
      .then((response) => {
        console.log("API Response:", response.data); // Debug statement to check API response
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  if (!seller) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
      <h2 className="text-3xl font-bold">Seller Details</h2>
      <div className="mt-3 text-sm">Check the details of the seller</div>
      <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
        <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
          <div className="p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
              <div className="mb-4">
                <div className="text-sm font-semibold">ID:</div>
                <div className="text-sm font-medium text-gray-700">
                  {seller._id}
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm font-semibold">Name:</div>
                <div className="text-sm font-medium text-gray-700">
                  {seller.name}
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm font-semibold">Email:</div>
                <div className="text-sm font-medium text-gray-700">
                  {seller.email}
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm font-semibold">Role:</div>
                <div className="text-sm font-medium text-gray-700">
                  {seller.role}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="p-8">
            <ul className="-my-7 divide-y divide-gray-200">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                >
                  <div
                    className="flex flex-1 items-stretch"
                    onClick={() =>
                      navigate(`/sellerProductDetail/${product._id}`)
                    }
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                        src={`http://localhost:8000/${product.image}`}
                        alt={product.imageSrc}
                      />
                    </div>

                    <div className="ml-5 flex flex-col justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">
                          {product.name}
                        </p>
                        <p className="mt-1.5 text-sm font-medium text-gray-500">
                          {product.color}
                        </p>
                      </div>

                      <p className="mt-4 text-sm font-medium text-gray-500">
                        Qauntity : {product.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="ml-auto flex flex-col items-end justify-between">
                    <p className="text-right text-sm font-bold text-gray-900">
                      $ {product.price}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
