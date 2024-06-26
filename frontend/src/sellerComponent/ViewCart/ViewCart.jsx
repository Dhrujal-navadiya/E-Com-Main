import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CartComponent() {
  const [products, setProducts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [buttonStates, setButtonStates] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    axios
      .get("http://localhost:8000/Sellercart/getcartSellerProduct", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        if (
          response.data.cartProducts &&
          Array.isArray(response.data.cartProducts)
        ) {
          setProducts(response.data.cartProducts);
          initializeButtonStates(response.data.cartProducts);
        } else {
          setError(new Error("Response is not in the expected format"));
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error);
      });
  }, [toggle]);

  const initializeButtonStates = (products) => {
    const initialStates = {};
    products.forEach((product) => {
      initialStates[product.Product] = {
        successDisabled: false,
        rejectedDisabled: false,
      };
    });
    setButtonStates(initialStates);
  };

  const handleStatusUpdate = async (productId, status) => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("✌️token --->", token);

      axios
        .put(
          "http://localhost:8000/Buyercart/updateCartProduct",
          {
            Product: productId,
            status: status,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log("✌️response --->", response);
          setToggle(!toggle);

          // Update button states based on the status
          setButtonStates((prevState) => ({
            ...prevState,
            [productId]: {
              successDisabled: status === "Success",
              rejectedDisabled: status === "Success" || status === "Rejected",
            },
          }));
        })
        .catch((error) => {
          console.log("Error updating product status:", error);
        });
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle error
    }
  };

  return (
    <div>
      {" "}
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Carts</h2>
          </div>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-2 md:px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  <span>Id</span>
                </th>
                <th
                  scope="col"
                  className="px-2 md:px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  <span>Image</span>
                </th>
                <th
                  scope="col"
                  className="px-2 md:px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-2 md:px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-2 md:px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-2 md:px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-2 md:px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {products.map((person) => (
                <tr key={person.name}>
                  <td className="whitespace-nowrap px-2 md:px-4 py-4">
                    <div className="text-sm text-gray-900">
                      #{person.user?.substring(person.Product.length - 4)}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-2 md:px-4 py-4">
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
                  <td className="whitespace-nowrap px-2 md:px-4 py-4">
                    <div className="flex flex-col ml-2 md:ml-6 text-sm text-gray-900">
                      <div>{person.name}</div>
                      <div className="text-gray-700">{person.department}</div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-2 md:px-4 py-4">
                    <div className="flex flex-col ml-2 md:ml-7 text-sm text-gray-900">
                      <div>{person.price}</div>
                      <div className="text-gray-700">{person.department}</div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-2 md:px-4 py-4">
                    <div className="flex flex-col ml-2 md:ml-12 text-sm text-gray-900">
                      <div>{person.quantity}</div>
                      <div className="text-gray-700">{person.department}</div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-2 md:px-4 py-4">
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
                  <td className="whitespace-nowrap px-2 md:px-4 py-4">
                    <div className="flex flex-col text-sm text-gray-900">
                      <div className="flex flex-wrap gap-2 md:gap-4">
                        <button
                          onClick={() =>
                            handleStatusUpdate(person.Product, "Success")
                          }
                          className={`bg-green-500 rounded-sm hover:bg-green-400 px-3 md:px-5 py-1 
        ${person.status === "Success" ? "opacity-50 cursor-not-allowed" : ""}`}
                          disabled={person.status === "Success"}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(person.Product, "Rejected")
                          }
                          className={`bg-red-500 rounded-sm hover:bg-red-400 px-3 md:px-5 py-1 
        ${
          person.status === "Success" || person.status === "Rejected"
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
                          disabled={
                            person.status === "Success" ||
                            person.status === "Rejected"
                          }
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
