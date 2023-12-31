import { motion } from "framer-motion";
import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Styledchart = styled.div`
  width: 100vw;
  height: 35vh;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  .lineChart {
    width: 40vw;
    height: 30vh;
  }

  .doughnutChart {
    width: 40vw;
    height: 30vh;
  }
`;

const MotionLineChart = ({ monthlySale }) => {
  const lineChartOptions = {
    data: {
      labels: Object.keys(monthlySale),
      datasets: [
        {
          label: "Online Sales",
          data: Object.keys(monthlySale).map(
            (month) => monthlySale[month].Online
          ),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          tension: 0.3,
        },
        {
          label: "Offline Sales",
          data: Object.keys(monthlySale).map(
            (month) => monthlySale[month].Offline
          ),
          fill: false,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
    },
  };

  return (
    <Line
      className="lineChart"
      data={lineChartOptions.data}
      options={lineChartOptions.options}
    />
  );
};

const MotionDoughChart = ({ monthlySale }) => {
  let totalOnlineSales = 0;
  let totalOfflineSales = 0;

  Object.values(monthlySale).forEach((sale) => {
    totalOnlineSales += sale.Online;
    totalOfflineSales += sale.Offline;
  });

  const doughnutChartOptions = {
    data: {
      labels: ["Online", "Offline"],
      datasets: [
        {
          label: "Sales",
          data: [totalOnlineSales, totalOfflineSales],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderWidth: 1,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
    },
  };

  return (
    <Doughnut
      className="doughnutChart"
      data={doughnutChartOptions.data}
      options={doughnutChartOptions.options}
    />
  );
};

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getdata = async () => {
      try {
        const result = await axios.get("http://localhost:3000/api/dashboard");
        // getMonthlySales(result.data);
        setData(result.data);
        getall();
      } catch (err) {
        console.log("problem found:", err);
      }
    };
    getdata();
  }, []);

  const { totalOrderDetails } = data;
  const arr = { ...totalOrderDetails };
  const monthlySale = {
    Jan: { Online: 0, Offline: 0 },
    Feb: { Online: 0, Offline: 0 },
    Mar: { Online: 0, Offline: 0 },
    Apr: { Online: 0, Offline: 0 },
    May: { Online: 0, Offline: 0 },
    Jun: { Online: 0, Offline: 0 },
    Jul: { Online: 0, Offline: 0 },
    Aug: { Online: 0, Offline: 0 },
    Sep: { Online: 0, Offline: 0 },
    Oct: { Online: 0, Offline: 0 },
    Nov: { Online: 0, Offline: 0 },
    Dec: { Online: 0, Offline: 0 },
  };
  const getall = () => {
    Object.keys(arr).forEach((key) => {
      const date = new Date(arr[key].orderDate);
      const month = date.toLocaleString("default", { month: "short" });
      const amount = Number(arr[key].price);
      const types = arr[key].orderType;
      console.log("typsss", typeof month);
      monthlySale[month][types] += amount;
    });
  };

  return (
    <div>
      <motion.div>
        <h2>Dashboard</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <Styledchart>
            <MotionLineChart monthlySale={monthlySale} />
            <MotionDoughChart monthlySale={monthlySale} />
          </Styledchart>
        </Suspense>
      </motion.div>
    </div>
  );
};

export default Dashboard;
