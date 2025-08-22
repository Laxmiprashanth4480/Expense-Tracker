import React, { useEffect, useRef } from "react";
import { Progress } from "antd";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

// Register necessary chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement, // Register PointElement for scatter, line charts, etc.
  LineElement // Register LineElement for line charts
);

const Analytics = ({ allTransaction }) => {
  // Category array
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "books",
    "bills",
    "medical",
    "fee",
    "tax",
  ];

  // Total transactions
  const totalTransaction = allTransaction.length;
  const totalIncomeTransactions = allTransaction.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransaction.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransaction) * 100;

  // Total turnover
  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  // Prepare chart data
  const lineChartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Total Turnover",
        data: [totalIncomeTurnover, totalExpenseTurnover],
        fill: false,
        borderColor: "#4caf50",
        tension: 0.1,
        backgroundColor: "rgba(76, 175, 80, 0.2)",
      },
    ],
  };

  const barChartData = {
    labels: categories,
    datasets: [
      {
        label: "Income Turnover",
        data: categories.map((category) =>
          allTransaction
            .filter(
              (transaction) =>
                transaction.type === "income" &&
                transaction.category === category
            )
            .reduce((acc, transaction) => acc + transaction.amount, 0)
        ),
        backgroundColor: "rgba(76, 175, 80, 0.5)",
      },
      {
        label: "Expense Turnover",
        data: categories.map((category) =>
          allTransaction
            .filter(
              (transaction) =>
                transaction.type === "expense" &&
                transaction.category === category
            )
            .reduce((acc, transaction) => acc + transaction.amount, 0)
        ),
        backgroundColor: "rgba(244, 67, 54, 0.5)",
      },
    ],
  };

  const pieChartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [totalIncomeTurnover, totalExpenseTurnover],
        backgroundColor: ["#4caf50", "#f44336"],
        hoverOffset: 4,
      },
    ],
  };

  // UseRef to reference the chart elements
  const chartRef = useRef(null);

  // Cleanup chart instance on unmount or before re-render
  useEffect(() => {
    const currentChartRef = chartRef.current; // Store the reference locally
    return () => {
      if (currentChartRef) {
        currentChartRef.destroy(); // Use the local variable for cleanup
      }
    };
  }, []);

  return (
    <div className="px-6 py-8 bg-gray-50 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Total Transactions Section */}
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h4 className="font-semibold text-2xl text-gray-900 mb-4">
            Total Transactions
          </h4>
          <p className="text-gray-700 mb-4">
            Total: {totalTransaction} Transactions
          </p>
          <h5 className="text-green-500">
            Income: {totalIncomeTransactions.length}
          </h5>
          <h5 className="text-red-500">
            Expense: {totalExpenseTransactions.length}
          </h5>
          <div className="mt-4">
            <Progress
              type="circle"
              strokeColor="green"
              className="mx-2"
              percent={totalIncomePercent.toFixed(0)}
            />
            <Progress
              type="circle"
              strokeColor="red"
              className="mx-2"
              percent={totalExpensePercent.toFixed(0)}
            />
          </div>
        </div>

        {/* Total Turnover Section */}
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h4 className="font-semibold text-2xl text-gray-900 mb-4">
            Total Turnover
          </h4>
          <p className="text-gray-700 mb-4">Total: ₹{totalTurnover}</p>
          <h5 className="text-green-500">Income: ₹{totalIncomeTurnover}</h5>
          <h5 className="text-red-500">Expense: ₹{totalExpenseTurnover}</h5>
          <div className="mt-4">
            <Progress
              type="circle"
              strokeColor="green"
              className="mx-2"
              percent={totalIncomeTurnoverPercent.toFixed(0)}
            />
            <Progress
              type="circle"
              strokeColor="red"
              className="mx-2"
              percent={totalExpenseTurnoverPercent.toFixed(0)}
            />
          </div>
        </div>

        {/* Line Chart: Income vs Expense */}
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h4 className="font-semibold text-2xl text-gray-900 mb-4">
            Income vs Expense Trend
          </h4>
          <Line
            data={lineChartData}
            options={{ responsive: true }}
            ref={chartRef}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bar Chart: Categorywise Income & Expense */}
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h4 className="font-semibold text-2xl text-gray-900 mb-4">
            Categorywise Income & Expense
          </h4>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>

        {/* Pie Chart: Income vs Expense Distribution */}
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h4 className="font-semibold text-2xl text-gray-900 mb-4">
            Income vs Expense Distribution
          </h4>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
