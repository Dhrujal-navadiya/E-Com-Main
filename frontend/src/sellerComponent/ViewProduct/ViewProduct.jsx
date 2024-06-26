import axios from "axios";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import statement

export default function ViewProduct() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // Define error state

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Token:", token); // This should print the token

    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken); // Debug statement to check decoded token
      const userId = decodedToken.userId;
      console.log(userId, "userId>>>>>>>>>>>>>>>>>>>...");

      axios
        .get(`http://localhost:8000/api/getProduct/${userId}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(
            "API Response: ????????? PPPPPPPPPPP PPPP ",
            response.data
          ); // Debug statement to check API response
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setError(error);
        });
    }
  }, []);

  if (error) {
    return <div>Error fetching products: {error.message}</div>;
  }

  if (products.length === 0) {
    return <div> No products found ++++</div>;
  }

  return (
    <div className="flex flex-wrap ">
      {products.map((product) => (
        <div
          key={product.id}
          className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 m-4"
        >
          <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
            <img
              src={`http://localhost:8000/${product.image}`}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                {product.name}
              </p>
              <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                ${product.price}
              </p>
            </div>
            {product.discountedPrice && (
              <div className="flex items-center justify-between mb-2">
                <p className="block font-sans text-sm antialiased font-medium leading-relaxed text-red-600">
                  Discounted Price: ${product.discountedPrice}
                </p>
                <p className="block font-sans text-sm antialiased font-medium leading-relaxed text-red-600">
                  {product.discountedPercentage}% off
                </p>
              </div>
            )}
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
              {product.description}
            </p>
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
              Quantity: {product.quantity}
            </p>
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
              Brand: {product.brand}
            </p>
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
              Color: {product.color}
            </p>
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
              Size: {product.size}
            </p>
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
              Category: {product.category}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
