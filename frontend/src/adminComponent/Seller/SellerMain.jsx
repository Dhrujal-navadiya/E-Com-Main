import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function sellerMain() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/Seller/getAllSeller", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(
          "API Response is here >>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<:",
          response.data
        );
        setProducts(response.data.seller);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-lg font-semibold">Seller</h2>
          <p className="mt-1 text-sm text-gray-700">Here All Seller User</p>
        </div>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="w-1/4 px-4 py-3.5 text-left text-sm font-normal text-gray-700"
              >
                <span>Id</span>
              </th>
              <th
                scope="col"
                className="w-1/4 px-4 py-3.5 text-left text-sm font-normal text-gray-700"
              >
                Name
              </th>
              <th
                scope="col"
                className="w-1/4 px-4 py-3.5 text-left text-sm font-normal text-gray-700"
              >
                Email
              </th>
            </tr>
          </thead>
          <tbody
            // onClick={navigate("/sellerDetail")}
            className="divide-y divide-gray-200 bg-white"
          >
            {products.map((person) => (
              <tr
                key={person._id}
                onClick={() => navigate(`/sellerDetail/${person._id}`)}
              >
                <td className="whitespace-nowrap px-4 py-4">
                  <div className="text-sm text-gray-900">
                    # {person._id.substring(person._id.length - 4)}
                  </div>
                </td>

                <td className="whitespace-nowrap px-4 py-4">
                  <div className="text-sm text-gray-900">{person.name}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-4">
                  <div className="text-sm text-gray-900">{person.email}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
