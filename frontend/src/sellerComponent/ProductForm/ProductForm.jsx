import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

const ProductForm = () => {
  const initialProductState = {
    user: "",
    name: "",
    description: "",
    price: "",
    discountedPrice: "",
    discountedPercentage: "",
    quantity: "",
    brand: "",
    color: "",
    size: "",
    image: "",
    category: "",
    customCategory: "",
  };

  const [product, setProduct] = useState(initialProductState);
  const [categories, setCategories] = useState([]);
  const [showSizeInput, setShowSizeInput] = useState(false); // State to control showing size input

  const resetForm = () => {
    setProduct(initialProductState);
    setShowSizeInput(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(value, "categrthrfdd");
    if (value === "cloth") {
      // console.log(setShowSizeInput(true), "setShowSizeInput(trye)");

      setShowSizeInput(true);
    } else {
      // console.log(setShowSizeInput(false), "setShowSizeInput(564656)");
      setShowSizeInput(false);
    }
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("accessToken");
    console.log(token, "token is here");
    const decodedToken = jwtDecode(token);
    console.log(token, "token is decode");

    const userId = decodedToken.userId;
    console.log("✌️userId --->", userId);
    console.log(token, "token is storee in userid");

    const data = new FormData();
    data.append("seller", userId);
    data.append("image", product.image);
    data.append("name", product.name);
    data.append("description", product.description);
    data.append("price", product.price);
    data.append("discountedPrice", product.discountedPrice);
    data.append("discountedPercentage", product.discountedPercentage);
    data.append("quantity", product.quantity);
    data.append("brand", product.brand);
    data.append("color", product.color);
    data.append("size", product.size);
    data.append("category", product.category);
    data.append("customCategory", product.customCategory);

    axios
      .post("http://localhost:8000/api/createProduct", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data, "resposnse");
        resetForm(); // Clear the product form fields
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  const CategorySubmit = (event) => {
    console.log(product.customCategory, "custom category");
    event.preventDefault();

    axios
      .post("http://localhost:8000/Category/categories", {
        name: product.customCategory,
      })

      .then((response) => {
        console.log(response, "resposnse");
        setProduct((prevProduct) => ({
          ...prevProduct,
          customCategory: "",
        }));
        getallCategory();
      })
      .catch((error) => {
        console.error("Error creating Category:", error);
      });
  };

  const getallCategory = (event) => {
    axios
      .get("http://localhost:8000/Category/getallCategory")

      .then((response) => {
        console.log(response.data, "response iis here");
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error get Category:", error);
      });
  };

  useEffect(() => {
    getallCategory();
  }, []);

  return (
    <div className="mt-5 m-72">
      <div className="border  border-black overflow-y-auto h-[500px] w- py-5 p-5">
        <div className="border-b border-gray-900/10 pb-12">
          <h1 className="text-base font-semibold leading-7 text-gray-900">
            Add To Products
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* // name */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={product.name}
                    onChange={handleChange}
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* //price */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={product.price}
                    onChange={handleChange}
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* //brand */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    value={product.brand}
                    onChange={handleChange}
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* // description */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <input
                    id="description"
                    name="description"
                    type="text"
                    value={product.description}
                    onChange={handleChange}
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* //category */}
              <div className="sm:col-span-6 inline-block">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  {/* Category select input */}
                  <div className="sm:w-1/3 pr-2">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Category
                    </label>
                    <div className="mt-2">
                      <select
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="py-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 pl-2"
                      >
                        <option value="" disabled>
                          Select category
                        </option>
                        {categories.map((category) => (
                          <option key={category._id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Custom category input */}
                  <div className="sm:w-1/3 pl-2">
                    <label
                      htmlFor="customCategory"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Custom Category
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="customCategory"
                        id="customCategory"
                        value={product.customCategory}
                        onChange={handleChange}
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {/* Submit button */}
                  <div className="sm:w-1/3 flex flex-wrap items-center">
                    <button
                      onClick={CategorySubmit}
                      type="submit"
                      className="border mt-7 border-black hover:bg-slate-200  py-1 px-2 rounded"
                    >
                      Add Category
                    </button>
                  </div>
                </div>
              </div>

              {/* //image */}
              <div className="col-span-full">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={(e) =>
                      setProduct({ ...product, image: e.target.files[0] })
                    }
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* //quantity */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Quantity
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={product.quantity}
                    onChange={handleChange}
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* //discountedPrice */}
              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="discountedPrice"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discounted Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="discountedPrice"
                    id="discountedPrice"
                    value={product.discountedPrice}
                    onChange={handleChange}
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* // discountedPercentage */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="discountedPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discounted Percentage
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="discountedPercentage"
                    id="discountedPercentage"
                    value={product.discountedPercentage}
                    onChange={handleChange}
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* //color */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="color"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Color
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="color"
                    id="color"
                    value={product.color}
                    onChange={handleChange}
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* //size */}
              {showSizeInput && (
                <div className="sm:col-span-2">
                  <label
                    htmlFor="size"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Size
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="size"
                      id="size"
                      value={product.size}
                      onChange={handleChange}
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="m-auto border border-black rounded-md hover:bg-slate-200 p-2 mt-6 flex justify-center items-center w-25">
              <button type="submit" className="text-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
