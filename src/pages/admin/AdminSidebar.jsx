import React, { useState } from 'react';
import { FaHome, FaTable, FaUser, FaBoxes, FaTags, FaUserFriends, FaClipboardList, FaCreditCard  } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate từ React Router DOM

const AdminSidebar = ({ isOpen }) => {
  const [selectedTab, setSelectedTab] = useState('dashboard'); // State để lưu trữ tab được chọn
  const navigate = useNavigate(); // Hook useNavigate để điều hướng đến các trang

  // Hàm để xử lý sự kiện khi click vào tab
  const handleTabClick = (tabName, path) => {
    setSelectedTab(tabName); // Cập nhật tab được chọn
    navigate(path); // Điều hướng đến đường dẫn path tương ứng
  };

  return (
    <div className={`bg-white text-gray-500 text-2xl h-full p-4 ${isOpen ? 'w-64' : 'w-20'} transition-width duration-300 flex flex-col justify-between`}>
      <div className="flex flex-col">
        <div className={`flex items-center space-x-2 p-2 cursor-pointer ${selectedTab === 'dashboard' ? 'bg-gray-200' : ''}`} onClick={() => handleTabClick('dashboard', '/admin')}>
          <FaHome className="text-2xl" />
          {isOpen && <span className={`text-lg ml-2 ${selectedTab === 'dashboard' ? 'text-gray-900 font-bold' : ''}`}>Main Dashboard</span>}
        </div>
        <div className={`flex items-center space-x-2 p-2 cursor-pointer ${selectedTab === 'products' ? 'bg-gray-200' : ''}`} onClick={() => handleTabClick('products', '/admin/products')}>
          <FaBoxes  className="text-2xl" />
          {isOpen && <span className={`text-lg ml-2 ${selectedTab === 'products' ? 'text-gray-900 font-bold' : ''}`}>Quản lý sản phẩm</span>}
        </div>
        <div className={`flex items-center space-x-2 p-2 cursor-pointer ${selectedTab === 'brands' ? 'bg-gray-200' : ''}`} onClick={() => handleTabClick('brands', '/admin/brands')}>
          <FaTags  className="text-2xl" />
          {isOpen && <span className={`text-lg ml-2 ${selectedTab === 'brands' ? 'text-gray-900 font-bold' : ''}`}>Quản lý thương hiệu</span>}
        </div>
        <div className={`flex items-center space-x-2 p-2 cursor-pointer ${selectedTab === 'kinds' ? 'bg-gray-200' : ''}`} onClick={() => handleTabClick('kinds', '/admin/kinds')}>
          <FaTable  className="text-2xl" />
          {isOpen && <span className={`text-lg ml-2 ${selectedTab === 'kinds' ? 'text-gray-900 font-bold' : ''}`}>Quản lý Loại sản phẩm</span>}
        </div>
        <div className={`flex items-center space-x-2 p-2 cursor-pointer ${selectedTab === 'accounts' ? 'bg-gray-200' : ''}`} onClick={() => handleTabClick('accounts', '/admin/accounts')}>
          <FaUserFriends  className="text-2xl" />
          {isOpen && <span className={`text-lg ml-2 ${selectedTab === 'accounts' ? 'text-gray-900 font-bold' : ''}`}>Quản lý tài khoản</span>}
        </div>
        <div className={`flex items-center space-x-2 p-2 cursor-pointer ${selectedTab === 'orders' ? 'bg-gray-200' : ''}`} onClick={() => handleTabClick('orders', '/admin/orders')}>
          <FaClipboardList  className="text-2xl" />
          {isOpen && <span className={`text-lg ml-2 ${selectedTab === 'orders' ? 'text-gray-900 font-bold' : ''}`}>Quản lý hóa đơn</span>}
        </div>
        <div className={`flex items-center space-x-2 p-2 cursor-pointer ${selectedTab === 'payments' ? 'bg-gray-200' : ''}`} onClick={() => handleTabClick('payments', '/admin/payments')}>
          <FaCreditCard   className="text-2xl" />
          {isOpen && <span className={`text-lg ml-2 ${selectedTab === 'payments' ? 'text-gray-900 font-bold' : ''}`}>Quản lý phương thức thanh toán</span>}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
