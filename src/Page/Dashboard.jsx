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
import { IconContext } from "react-icons";
import { HiMiniUsers, HiBriefcase } from "react-icons/hi2";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { LuRedo2 } from "react-icons/lu";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";

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
const StyledDashboard = styled.div`
  padding: 2rem 3rem;
  .topcards {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;
const Styledchart = styled.div`
  width: 100%;
  height: 500px;
  margin: 2rem 0;
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
  const cards = ["user", "product", "newuser", "refund"];
  return (
    <StyledDashboard>
      <h2>Dashboard</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="topcards">
          {cards.map((elm, ind) => (
            <CreateCard
              icon={elm.toString()}
              data={{
                number: 2584,
                stats: ind % 2 == 0 ? "positive" : "negative",
                statsNum: ind % 2 == 0 ? "+0.4%" : "-0.5%",
              }}
            />
          ))}
        </div>

        {Object.keys(monthlySale).length > 0 && (
          <Styledchart>
            <MotionLineChart monthlySale={monthlySale} />
            <MotionDoughChart monthlySale={monthlySale} />
          </Styledchart>
        )}
      </Suspense>
    </StyledDashboard>
  );
};

const StyledSmallCard = styled.div`
  width: 260px;
  height: 140px;
  background-color: #fff;
  border: 0;
  border-radius: 1rem;
  margin: 2rem 0;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;
  .top {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
  }
  .bottom {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
    gap: 0.5rem;
    font-weight: 400;

    .info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5rem;
    }
  }
`;

const CreateCard = ({
  name = "Total User",
  data = { number: 34584, stats: "positive", statsNum: "-0.5%" },
  icon = "user",
}) => {
  return (
    <StyledSmallCard>
      <div className="top">
        <h2 className="heading">{data.number}</h2>
        <IconContext.Provider
          value={{
            color: "#7bfc36",
            className: "global-class-name",
            size: "40px",
            style: {
              padding: "4px",
              borderRadius: "4px",
              backgroundColor: "#eff8ea",
            },
          }}
        >
          {icon === "user" ? (
            <HiMiniUsers />
          ) : icon === "newuser" ? (
            <IoCheckmarkDoneCircleOutline />
          ) : icon === "product" ? (
            <HiBriefcase />
          ) : (
            <LuRedo2 />
          )}
        </IconContext.Provider>
      </div>
      <div className="bottom">
        <p className="name">{name}</p>
        <div className="info">
          {data.stats === "positive" ? (
            <GoArrowUpRight color="#02B727" />
          ) : (
            <GoArrowDownLeft color="#FE2C1D" />
          )}
          {data.statsNum} this week
        </div>
      </div>
    </StyledSmallCard>
  );
};

const MotionLineChart = ({ monthlySale }) => {
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
