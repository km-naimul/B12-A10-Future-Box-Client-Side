import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import Swal from "sweetalert2";

const Reports = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/transactions?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setFilteredData(data);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to load transactions!", "error");
      });
  }, [user]);

  // ✅ Filter by Month
  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    if (month === "") {
      setFilteredData(transactions);
    } else {
      const filtered = transactions.filter((t) => {
        const date = new Date(t.date);
        return date.getMonth() + 1 === parseInt(month);
      });
      setFilteredData(filtered);
    }
  };

  // ✅ Pie Chart Data (by Category)
  const categoryData = Object.values(
    filteredData.reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = { name: t.category, value: 0 };
      }
      acc[t.category].value += parseFloat(t.amount);
      return acc;
    }, {})
  );

  // ✅ Bar Chart Data (Monthly Totals)
  const monthlyData = Object.values(
    transactions.reduce((acc, t) => {
      const month = new Date(t.date).toLocaleString("default", { month: "short" });
      if (!acc[month]) {
        acc[month] = { month, total: 0 };
      }
      acc[month].total += parseFloat(t.amount);
      return acc;
    }, {})
  );

  const COLORS = ["#00C49F", "#FF8042", "#FFBB28", "#8884D8", "#0088FE"];

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <h2 className="text-4xl font-bold text-center mb-8 text-primary">
        Financial Reports & Insights
      </h2>

      {/* Filter Section */}
      <div className="flex justify-center mb-8">
        <select
          className="select select-bordered w-60"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10">
        {/* Pie Chart for Categories */}
        <div className="bg-base-100 shadow-xl rounded-2xl p-6">
          <h3 className="text-2xl font-semibold mb-4 text-center">Category Distribution</h3>
          {categoryData.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">No data available.</p>
          )}
        </div>

        {/* Bar Chart for Monthly Totals */}
        <div className="bg-base-100 shadow-xl rounded-2xl p-6">
          <h3 className="text-2xl font-semibold mb-4 text-center">Monthly Totals</h3>
          {monthlyData.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
