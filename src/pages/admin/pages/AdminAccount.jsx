// DataTablesPage.jsx
import React, { useState, useEffect } from 'react';
import {BsLock, BsUnlock, BsPerson } from 'react-icons/bs';
import DataTable from 'react-data-table-component';
import { Pagination, Breadcrumbs, Link } from '@mui/material';
import Modal from 'react-modal'; // Sử dụng Modal từ react-modal
import { toast } from "react-toastify";

const AdminAccount = () => {
  const [records, setRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const urladmin = "http://localhost:8080/api/v1/admin";
  const columns = [
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">ID</div>,
      selector: row => row.id,
      width: "5rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.id}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Tên người dùng</div>,
      selector: row => row.username,
      // width: "15rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.username}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Họ và tên</div>,
      selector: row => row.fullname,
      // width: "15rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.fullname}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Email</div>,
      selector: row => row.email,
      // width: "15rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.email}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Số điện thoại</div>,
      selector: row => row.phone,
      // width: "15rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.phone}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Giới tính</div>,
      selector: row => row.gender,
      // width: "15rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.gender == 0 ? 'Nam' : 'Nữ'}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Trạng thái</div>,
      selector: row => row.status.value,
      // width: "15rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.status.value}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Quyền</div>,
      selector: row => row.role.value,
      // width: "15rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.role.value}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Hành động</div>,
      // width: "10rem",
      cell: row => (
        <div className="flex justify-center items-center w-full">
          {row.status.value === 'LOCK' ? (
            <BsLock
              className="cursor-pointer text-red-500 mr-4"
              onClick={() => handleLock(row)}
              title="Mở khóa tài khoản"
            />
          ) : (
            <BsUnlock
              className="cursor-pointer text-green-500 mr-4"
              onClick={() => handleLock(row)}
              title="Khóa tài khoản"
            />
          )}
        <BsPerson
          className="cursor-pointer text-green-500"
          onClick={() => handleRole(row)}
          title="Phân quyền"
        />
        </div>
      ),
    },
  ];
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  // const handleAddNew = () => {
  //   setSelectedKind(null);
  //   setModalType('add');
  //   setIsModalOpen(true);
  // };
  const handleLock = (row) => {
    setSelectedAccount(row);
    if (row.status.value === 'LOCK') {
      setModalType('unlock');
    } else {
      setModalType('lock');
    }
    setIsModalOpen(true);
  };
  const handleRole = (row) => {
    setSelectedAccount(row);
    if (row.role.value === 'ADMIN') {
      setModalType('low');
    } else {
      setModalType('up');
    }
    setIsModalOpen(true);
  };

  const changeLock = async () => {
    const accId = selectedAccount.id;
    const status = selectedAccount.status.value;
    const isLockStatus = status === "LOCK" ? false : true;
  
    try {
      const response = await fetch(`${urladmin}/account/status/${accId}?is-lock=${isLockStatus}`, {
        method: 'PATCH', 
        headers: headers
      });
  
      if (response.ok) {
        window.location.reload();
        toast.success("Cập nhật thành công!");
        closeModal();
        setSelectedAccount(null);
      } else {
        console.error('Failed to update acc:', response.statusText);
      }
    } catch (error) {
      toast.error('Error:', error.message);
    }
  };
  
  
  const ChangeRole = async () => {
    const accId = selectedAccount.id;
    const role = selectedAccount.role.value;
    const isLowRole = role === "CLIENT" ? false : true;
  
    try {
      const response = await fetch(`${urladmin}/account/role/${accId}?is-low=${isLowRole}`, {
        method: 'PATCH', 
        headers: headers
      });
  
      if (response.ok) {
        toast.success("Cập nhật thành công!");
        closeModal();
        setSelectedAccount(null);
        window.location.reload();
      } else {
        console.error('Failed to update acc:', response.statusText);
      }
    } catch (error) {
      
      console.error('Failed to update acc:', error);
      toast.error('Error:', error);
    }
  };
  



  useEffect(() => {
    getAllAccount();
  }, [page, searchValue, page]);

  const getAllAccount = async () => {
    try {
      const response = await fetch(`${urladmin}/account/all?page=${page}&size=10&search=${searchValue}`, {
        headers: headers
      });
      const data = await response.json();
      setRecords(data.content);
      setTotalPage(data.totalPages);
      console.log(data);
    } catch (error) {
        toast.error("Error: ", error);
    }
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAccount(null);
    setModalType(null);
  };


  const renderModalContent = () => {
    switch (modalType) {
      case 'lock':
        return (
          <div className="p-6 bg-white rounded-lg">
            <h2 className="text-4xl font-bold mb-4 text-center">Khóa tài khoản</h2>
            <p className="text-center text-lg my-8">Bạn có chắc chắn muốn khóa tài khoản này không?</p>
            <div className="mt-4 mx-auto flex justify-center">
              <button type="button" className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg" onClick={closeModal}>Hủy</button>
              <button type="button" className="ml-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg" onClick={changeLock}>Khóa</button>
            </div>
          </div>
        );
      case 'unlock':
        return (
          <div className="p-6 bg-white rounded-lg">
            <h2 className="text-4xl font-bold mb-4 text-center">Mở khóa tài khoản</h2>
            <p className="text-center text-lg my-8">Bạn có chắc chắn muốn mở khóa tài khoản này không?</p>
            <div className="mt-4 mx-auto flex justify-center">
              <button type="button" className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg" onClick={closeModal}>Hủy</button>
              <button type="button" className="ml-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg" onClick={changeLock}>Mở khóa</button>
            </div>
          </div>
        );
      case 'low':
        return (
          <div className="p-6 bg-white rounded-lg">
            <h2 className="text-4xl font-bold mb-4 text-center">Phân quyền</h2>
            <p className="text-center text-lg my-8">Bạn có chắc chắn muốn phân quyền CLIENT cho tài khoản này không?</p>
            <div className="mt-4 mx-auto flex justify-center">
              <button type="button" className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg" onClick={closeModal}>Hủy</button>
              <button type="button" className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg" onClick={ChangeRole}>Phân quyền</button>
            </div>
          </div>
        );
      case 'up':
        return (
          <div className="p-6 bg-white rounded-lg">
            <h2 className="text-4xl font-bold mb-4 text-center">Phân quyền</h2>
            <p className="text-center text-lg my-8">Bạn có chắc chắn muốn phân quyền ADMIN cho tài khoản này không?</p>
            <div className="mt-4 mx-auto flex justify-center">
              <button type="button" className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg" onClick={closeModal}>Hủy</button>
              <button type="button" className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg" onClick={ChangeRole}>Phân quyền</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div>
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/admin">
        Admin Home
      </Link>
      <Link color="inherit" href="accounts">
        Quản lý tài khoản
      </Link>
    </Breadcrumbs>
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          onChange={(e) =>  setSearchValue(e.target.value)}
          placeholder="Nhập tên người dùng"
          className="mr-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white outline-none w-80"
        />
        {/* <button onClick={handleAddNew} className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Thêm mới loại sản phẩm
        </button> */}
      </div>
      <DataTable
        columns={columns}
        data={records}
        noDataComponent={<div className="emptyData">Không có dữ liệu</div>}
        className="rounded-lg overflow-hidden shadow-lg"
      />
      <Pagination
        count={totalPage}
        boundaryCount={2}
        siblingCount={1}
        color="primary"
        showFirstButton
        showLastButton
        className="mt-4 flex justify-end"
        page={page}
        onChange={handleChangePage}
      />
    </div>
<Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Chi tiết sản phẩm"
  className="Modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50 w-11/12 max-w-3xl"
  overlayClassName="Overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 flex justify-center items-center"
>
  <div className="modal-content relative bg-white rounded-lg shadow-lg p-6 text-black overflow-y-auto max-h-screen">
    <button className="modal-close absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800 text-2xl font-bold" onClick={closeModal}>&times;</button>
    <div className="modal-body">
      {renderModalContent()}
    </div>
  </div>
</Modal>

  </div>
  );
};


export default AdminAccount;
