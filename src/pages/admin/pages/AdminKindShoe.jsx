// DataTablesPage.jsx
import React, { useState, useEffect } from 'react';
import {BsPencilSquare } from 'react-icons/bs';
import DataTable from 'react-data-table-component';
import { Pagination, Breadcrumbs, Link } from '@mui/material';
import Modal from 'react-modal'; // Sử dụng Modal từ react-modal
import { toast } from "react-toastify";

const AdminKindShoe = () => {
  const [records, setRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // Loại chức năng hiện tại (view, edit, add)
  const [selectedKind, setSelectedKind] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const token = localStorage.getItem("token");
  
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const urladmin = "http://localhost:8080/api/v1/admin";
  const columns = [
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">ID</div>,
      selector: row => row.id,
      // width: "8rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.id}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Tên Loại sản phẩm</div>,
      selector: row => row.name,
      // width: "15rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.name}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Hành động</div>,
      // width: "10rem",
      cell: row => (
        <div className="flex justify-center items-center w-full">
          <BsPencilSquare
            className="cursor-pointer text-yellow-500 mr-4"
            onClick={() => handleEdit(row)}
          />
        </div>
      ),
    },
  ];
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const handleAddNew = () => {
    setSelectedKind(null);
    setModalType('add');
    setFormData({
      name:  ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedKind(row);
    setModalType('edit');
    setIsModalOpen(true);
  };
  useEffect(() => {
    getAllKind();
  }, [page, searchValue, page]);

  const getAllKind = async () => {
    try {
      const response = await fetch(`${urladmin}/type/all?page=${page}&size=10&search=${searchValue}`, {
        headers: headers
      });
      const data = await response.json();
      setRecords(data.content);
      setTotalPage(data.totalPages);
    } catch (error) {
        toast.error("Error: ", error);
    }
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedKind(null);
    setFormData({
      name:  ''
    });
    setModalType(null);
  };
  const [formData, setFormData] = useState({
    name:  ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedKind((prevBrand) => ({
      ...prevBrand,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { id, name } = selectedKind;
    if (!name) {
      toast.error('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const requestData = {
      id,
      name,
    };
    try {
      const response = await fetch(`${urladmin}/type`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const updatedBrand = await response.json();
        console.log('Product updated successfully:', updatedBrand);
        const updatedBrands = records.map(record => {
          if (record.id === updatedBrand.id) {
            return updatedBrand;
          }
          return record;
        });
        setRecords(updatedBrands);
        toast.success("Cập nhật thành công!");
        closeModal();
        
        setSelectedKind(null);
      } else {
        console.error('Failed to update brand:', response.statusText);
      }
    } catch (error) {
      toast.error('Error:', error.message);
    }
  };
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    try {
      const response = await fetch(`${urladmin}/type`, {
        method: 'POST', 
        headers: headers,
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newBrand = await response.json();
        console.log('Product updated successfully:', newBrand);
        setRecords(prevRecords => [...prevRecords, newBrand]);
        toast.success("Tạo thành công!");
        closeModal();
        setFormData({
          name:  ''
        });
      } else {
        toast.error('Error:', response.statusText);
      }
    } catch (error) {
      toast.error('Error:', error.message);
    }
      // Close modal after submission
      closeModal();
  };


  const renderModalContent = () => {
    switch (modalType) {
      case 'edit':
        return (
          <div className="p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Chỉnh sửa Loại sản phẩm</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Tên loại sản phẩm</label>
                <input
                  type="text"
                  name="name"
                  value={selectedKind.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white outline-none"
                  required
                />
              </div>
              <div className="mt-4 mx-auto flex justify-center">
                    <button type="button" className=" px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg" onClick={closeModal}>Hủy</button>
                    <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg">Lưu</button>
                  </div>
            </form>
          </div>
        );
      case 'add':
        return (
          <div className="p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Thêm mới Loại sản phẩm</h2>
            <form onSubmit={handleCreateSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Tên loại sản phẩm</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white outline-none"
                  required
                />
              </div>
              <div className="mt-4 mx-auto flex justify-center">
                    <button type="button" className=" px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg" onClick={closeModal}>Hủy</button>
                    <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg">Lưu</button>
                  </div>
            </form>
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
      <Link color="inherit" href="kinds">
        Quản lý loại sản phẩm
      </Link>
    </Breadcrumbs>
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          onChange={(e) =>  setSearchValue(e.target.value)}
          placeholder="Nhập tên loại sản phẩm"
          className="mr-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white outline-none w-80"
        />
        <button onClick={handleAddNew} className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Thêm mới loại sản phẩm
        </button>
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


export default AdminKindShoe;
