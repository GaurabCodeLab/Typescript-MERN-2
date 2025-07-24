import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Dashboard</h1>

      {/* Current Balance / Net Worth */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Current Balance
        </h2>
        <p className="text-3xl text-green-600 font-bold">₹1,25,000</p>
      </div>

      {/* Income vs Expenses Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Income (This Month)
          </h2>
          <p className="text-xl text-green-500 font-bold">₹75,000</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Expenses (This Month)
          </h2>
          <p className="text-xl text-red-500 font-bold">₹45,000</p>
        </div>
      </div>

      {/* Upcoming Bills / EMIs */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Upcoming Bills / EMIs
        </h2>
        <ul className="space-y-2">
          <li className="flex justify-between text-sm">
            <span>Credit Card Payment</span>
            <span className="text-red-500 font-medium">Due: 20th July</span>
          </li>
          <li className="flex justify-between text-sm">
            <span>Car Loan EMI</span>
            <span className="text-red-500 font-medium">Due: 25th July</span>
          </li>
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add Income
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add Expense
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Pay Bill
          </button>
        </div>
      </div>

      {/* Financial Goal Tracker */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Financial Goal Progress
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Saving for Emergency Fund (Goal: ₹1,00,000)
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: "60%" }}
          ></div>
        </div>
        <p className="text-sm text-gray-700 mt-1">60% completed</p>
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-6 mt-8 text-blue-600 font-medium">
        <a href="#" className="hover:underline">
          Income
        </a>
        <a href="#" className="hover:underline">
          Expenses
        </a>
        <a href="#" className="hover:underline">
          Bills/EMIs
        </a>
        <a href="#" className="hover:underline">
          Reports
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
