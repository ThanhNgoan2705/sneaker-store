import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { FaMoneyBillWave, FaCalendarDay, FaShoppingCart, FaRegCalendarAlt } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [totalMoney, setTotalMoney] = useState(0);
  const [todayMoney, setTodayMoney] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [todayOrders, setTodayOrders] = useState(0);
  const [monthlyOrders, setMonthlyOrders] = useState(Array(12).fill(0)); // Khởi tạo với 12 phần tử bằng 0
  const [monthlyMoney, setMonthlyMoney] = useState(Array(12).fill(0)); // Khởi tạo với 12 phần tử bằng 0
  const currentYear = new Date().getFullYear();

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalMoneyResponse = await fetch('http://localhost:8080/api/v1/admin/statistical/order/money/all', {
          headers: headers
        });
        const totalMoneyData = await totalMoneyResponse.json();
        setTotalMoney(totalMoneyData || 0);

        const todayMoneyResponse = await fetch('http://localhost:8080/api/v1/admin/statistical/order/money/current', {
          headers: headers
        });
        const todayMoneyData = await todayMoneyResponse.json();
        setTodayMoney(todayMoneyData || 0);

        const totalOrdersResponse = await fetch('http://localhost:8080/api/v1/admin/statistical/order/count/all', {
          headers: headers
        });
        const totalOrdersData = await totalOrdersResponse.json();
        setTotalOrders(totalOrdersData || 0);

        const todayOrdersResponse = await fetch('http://localhost:8080/api/v1/admin/statistical/order/count/current', {
          headers: headers
        });
        const todayOrdersData = await todayOrdersResponse.json();
        setTodayOrders(todayOrdersData || 0);

        const monthlyOrdersResponse = await fetch(`http://localhost:8080/api/v1/admin/statistical/order/count?year=${currentYear}`, {
          headers: headers
        });
        const monthlyOrdersData = await monthlyOrdersResponse.json();
        setMonthlyOrders(monthlyOrdersData || Array(12).fill(0));

        const monthlyMoneyResponse = await fetch(`http://localhost:8080/api/v1/admin/statistical/order/money?year=${currentYear}`, {
          headers: headers
        });
        const monthlyMoneyData = await monthlyMoneyResponse.json();
        setMonthlyMoney(monthlyMoneyData || Array(12).fill(0));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentYear]);

  const ordersData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Orders per Month',
        data: monthlyOrders,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const moneyData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Money per Month',
        data: monthlyMoney,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Welcome to Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-100 p-6 rounded-lg shadow-md flex items-center">
          <FaMoneyBillWave className="text-green-500 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-medium text-green-700">Tổng tiền</h3>
            <p className="text-2xl font-bold text-green-900">{totalMoney.toLocaleString('vi-VN')}đ</p>
          </div>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg shadow-md flex items-center">
          <FaCalendarDay className="text-blue-500 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-medium text-blue-700">Tổng tiền hôm nay</h3>
            <p className="text-2xl font-bold text-blue-900">{todayMoney.toLocaleString('vi-VN')}đ</p>
          </div>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md flex items-center">
          <FaShoppingCart className="text-yellow-500 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-medium text-yellow-700">Tổng đơn hàng</h3>
            <p className="text-2xl font-bold text-yellow-900">{totalOrders}</p>
          </div>
        </div>
        <div className="bg-red-100 p-6 rounded-lg shadow-md flex items-center">
          <FaRegCalendarAlt className="text-red-500 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-medium text-red-700">Tổng đơn hàng hôm nay</h3>
            <p className="text-2xl font-bold text-red-900">{todayOrders}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">Tổng đơn hàng từng tháng</h3>
          <Bar data={ordersData} options={options} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">Tổng tiền từng tháng</h3>
          <Bar data={moneyData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
