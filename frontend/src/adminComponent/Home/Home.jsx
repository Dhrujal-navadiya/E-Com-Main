import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { IoBagHandle } from "react-icons/io5";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaHouseUser } from "react-icons/fa";

import axios from "axios";

const chartConfig = {
  type: "line",
  height: 240,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("✌️token --->", token);

      axios
        .get("http://localhost:8000/api/getAllProduct", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("✌️response --??>>>>>>>>>>>>>>->", response);
          setProducts(response.data);
        })
        .catch((error) => {
          console.log("Error updating product status:", error);
        });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }, []);

  const [buyerProduct, setBuyerProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/Buyer/getallBuyer", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(
          "API Response is here >>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<:",
          response.data
        );
        setBuyerProduct(response.data.buyers);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const [sellerProducts, setSellerProducts] = useState([]);

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
        setSellerProducts(response.data.seller);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-between gap-4 p-4 ml-4 mr-4">
        <div className="flex flex-wrap ">
          {products && Array.isArray(products) && (
            <>
              <div className="block max-w-[18rem] rounded-lg border border-[#332D2D] bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                <div className="border-b-2 border-neutral-100 px-6 py-3 text-lg dark:border-white/10">
                  <div className="flex block-inline justify-center items-center gap-3">
                    <span>
                      <FaHouseUser />
                    </span>
                    <span className="font-bold w-full text-center">
                      Total Seller{" "}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-4xl font-bold text-center">
                    {sellerProducts.length}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <div>
          {products && Array.isArray(products) && (
            <div className="block max-w-[18rem] rounded-lg border border-[#332D2D] bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
              <div className="border-b-2 border-neutral-100 px-6 py-3 text-lg dark:border-white/10">
                <div className="flex justify-center items-center gap-3">
                  <span>
                    <HiMiniUserGroup />
                  </span>
                  <span className="font-bold w-full text-center">
                    Total Buyers
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-4xl font-bold text-center">
                  {buyerProduct.length}
                </p>
              </div>
            </div>
          )}
        </div>
        <div>
          {products && Array.isArray(products) && (
            <>
              <div className="block max-w-[18rem] rounded-lg border border-[#332D2D] bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
                <div className="border-b-2 border-neutral-100 px-6 py-3 text-lg dark:border-white/10">
                  <div className="flex block-inline justify-center items-center gap-3">
                    <span>
                      <IoBagHandle />
                    </span>
                    <span className="font-bold w-full text-center">
                      Total Product
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-4xl font-bold text-center">
                    {products.length}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-5">
        {" "}
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
              <Square3Stack3DIcon className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Line Chart
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="max-w-sm font-normal"
              >
                Visualize your data in a simple way using the
                @material-tailwind/react chart plugin.
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            <Chart {...chartConfig} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
