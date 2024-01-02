import { motion } from "framer-motion";
import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useState,
  use,
} from "react";
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
  layouts,
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
  width: 100%;
  height: 500px;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;

  h3 {
    line-height: 1;
    margin: 0;
  }

  .lineChart {
    width: 60%;
    height: 500px;
    padding: 1rem;
    background-color: #fff;
    border: 0;
    border-radius: 1rem;
  }

  .doughnutChart {
    width: 40%;
    height: 500px;
    padding: 1rem;
    background-color: #fff;
    border: 0;
    border-radius: 1rem;
  }
`;

const Dashboard = () => {
  const [data, setData] = useState({});
  const { totalOrderDetails } = data;
  let [monthlySale, setMonthlySale] = useState({});

  useEffect(() => {
    const getdata = () => {
      axios
        .get("http://localhost:3000/api/dashboard")
        .then((res) => {
          // console.log("-res data-->", res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log("problem found:", err);
        });
    };
    getdata();
  }, []);

  useEffect(() => {
    if (totalOrderDetails) getMonthlySales(totalOrderDetails);
  }, [totalOrderDetails]);

  const getMonthlySales = (totalOrderDetails) => {
    let newMonthlySale = {}; // Use a new variable to store the monthly sales

    Object.keys(totalOrderDetails).forEach((key) => {
      const date = new Date(totalOrderDetails[key].orderDate);
      const month = date.toLocaleString("default", { month: "short" });
      const amount = Number(totalOrderDetails[key].price);
      const types = totalOrderDetails[key].orderType;

      if (!newMonthlySale[month]) {
        newMonthlySale[month] = { Online: 0, Offline: 0 };
      }
      newMonthlySale[month][types] += amount;
    });

    // console.log("after looop", monthlySale);
    setMonthlySale(newMonthlySale);
  };

  return (
    <div>
      <motion.div>
        <h2>Dashboard</h2>
        <Suspense fallback={<div>Loading...</div>}>
          {Object.keys(monthlySale).length > 0 && (
            <Styledchart>
              <MotionLineChart monthlySale={monthlySale} />
              <MotionDoughChart monthlySale={monthlySale} />
            </Styledchart>
          )}
        </Suspense>
      </motion.div>
    </div>
  );
};

const MotionLineChart = ({ monthlySale }) => {
  console.log("line m sale", monthlySale);
  const data = {
    width: 300,
    height: 300,
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
  };

  return (
    <div className="lineChart">
      <h3>Order Analytics</h3>
      <Line data={data} options={{ layout: { padding: 20 } }} />
    </div>
  );
};

const MotionDoughChart = ({ monthlySale }) => {
  let totalOnlineSales = 0;
  let totalOfflineSales = 0;

  Object.values(monthlySale).forEach((sale) => {
    totalOnlineSales += sale.Online;
    totalOfflineSales += sale.Offline;
  });

  const data = {
    labels: ["Online", "Offline"],
    datasets: [
      {
        label: "Sales",
        data: [totalOnlineSales, totalOfflineSales],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderWidth: 1,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="doughnutChart">
      <h3>Earnings</h3>
      <Doughnut data={data} options={{ layout: { padding: 20 } }} />
    </div>
  );
};

export default Dashboard;
