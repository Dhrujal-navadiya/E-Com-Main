import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SellerDetail() {
  const [buyer, setBuyer] = useState(null);
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  console.log("✌️id --->", id);

  // Fetch seller details by ID
  useEffect(() => {
    axios
      .get(`http://localhost:8000/Buyer/getBuyerById/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        setBuyer(response.data);
      })
      .catch((error) => {
        console.error("Error fetching buyer details:", error);
      });
  }, [id]);

  // Fetch cart products for the seller
  //   const [products, setProducts] = useState([]);
  //   const [filteredProducts, setFilteredProducts] = useState([]);
  //   const [filterStatus, setFilterStatus] = useState("");

  //   const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    console.log("Token:", token); // This should print the token

    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token new is here:", decodedToken); // Debug statement to check decoded token
      const userId = decodedToken.userId;
      console.log(userId, "userId>>>>>>>>>>>>>>>>>>>...");

      axios
        .get(`http://localhost:8000/Buyercart/getCartProduct/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        })
        .then((response) => {
          console.log("API Response:", response.data); // Debug statement to check API response
          setProducts(response.data.cartProducts);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, []);

  if (!buyer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
      <h2 className="text-3xl font-bold">Buyer Details</h2>
      <div className="mt-3 text-sm">Check the details of the buyer</div>
      <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
        <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
          <div className="p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
              <div className="mb-4">
                <div className="text-sm font-semibold">ID:</div>
                <div className="text-sm font-medium text-gray-700">
                  {buyer._id}
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm font-semibold">Name:</div>
                <div className="text-sm font-medium text-gray-700">
                  {buyer.name}
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm font-semibold">Email:</div>
                <div className="text-sm font-medium text-gray-700">
                  {buyer.email}
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm font-semibold">Role:</div>
                <div className="text-sm font-medium text-gray-700">
                  {buyer.role}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="p-8">
            <ul className="-my-7 divide-y divide-gray-200">
              {products.length === 0 ? (
                <p className="text-gray-500">No products in the cart</p>
              ) : (
                <ul className="-my-7 divide-y divide-gray-200">
                  {products.map((product) => (
                    <li
                      key={product._id} // Change 'id' to '_id' to match the product object
                      className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                    >
                      <div className="flex flex-1 items-stretch">
                        <div className="flex-shrink-0">
                          <img
                            className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                            src={`http://localhost:8000/${product.image}`}
                            alt={product.name} // Change 'imageSrc' to 'name' to match the product object
                          />
                        </div>

                        <div className="ml-5 flex flex-col justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900">
                              {product.name}
                            </p>
                          </div>

                          <p className="mt-4 text-sm font-medium text-gray-500">
                            Quantity: {product.quantity}
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
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
