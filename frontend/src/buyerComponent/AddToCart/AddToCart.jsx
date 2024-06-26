import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function CartComponent() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    console.log("Token:", token); // This should print the token

    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token new is here:", decodedToken); // Debug statement to check decoded token
      const userId = decodedToken.userId;
      console.log(userId, "userId>>>>>>>>>>>>>>>>>>>...");

      axios
        .get(`http://localhost:8000/Buyercart/getCartProduct/${userId}`, {
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

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-lg font-semibold">Carts</h2>
        </div>
      </div>
      {products.length === 0 && (
        <div className="flex items-center justify-center mt-56 h-full">
          <p className="text-gray-500 text-xl">No products in the cart.</p>
        </div>
      )}
      {products.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  <span>Id</span>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  <span>Image</span>
                </th>
                <th
                  scope="col"
                  className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {products.map((person) => (
                <tr key={person.name}>
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="text-sm text-gray-900 ">
                      #{person.Product?.substring(person.Product.length - 4)}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={`http://localhost:8000/${person.image}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="flex flex-col ml-6 text-sm text-gray-900">
                      <div>{person.name}</div>
                      <div className="text-gray-700">{person.department}</div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="flex flex-col ml-7 text-sm text-gray-900">
                      <div>{person.price}</div>
                      <div className="text-gray-700">{person.department}</div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="flex flex-col ml-12 text-sm text-gray-900">
                      <div>{person.quantity}</div>
                      <div className="text-gray-700">{person.department}</div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    {person.status === "Success" ? (
                      <span className="inline-flex rounded-full bg-green-500 px-2 text-xs font-semibold leading-5 text-black">
                        {person.status}
                      </span>
                    ) : person.status === "Pending" ? (
                      <span className="inline-flex rounded-full bg-yellow-300 px-2 text-xs font-semibold leading-5 text-black">
                        {person.status}
                      </span>
                    ) : person.status === "Rejected" ? (
                      <span className="inline-flex rounded-full bg-red-500 px-2 text-xs font-semibold leading-5 text-black">
                        {person.status}
                      </span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
