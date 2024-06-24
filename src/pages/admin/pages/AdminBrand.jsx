// DataTablesPage.jsx
import React, { useState, useEffect } from 'react';
import {BsPencilSquare } from 'react-icons/bs';
import DataTable from 'react-data-table-component';
import { Pagination, Breadcrumbs, Link } from '@mui/material';
import Modal from 'react-modal'; // Sử dụng Modal từ react-modal
import { toast } from "react-toastify";

const AdminBrand = () => {
  const [records, setRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // Loại chức năng hiện tại (view, edit, add)
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [statuses, setStatuses] = useState([]);
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  
const [formData, setFormData] = useState({
  name:  '',
  code: '',
  description: '',
  status: 'S1',
});

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const columns = [
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">ID</div>,
      selector: row => row.id,
      width: "8rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.id}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Tên thương hiệu</div>,
      selector: row => row.name,
      // width: "15rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.name}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Mã thương hiệu</div>,
      selector: row => row.code,
      // width: "15rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.code}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Mô tả</div>,
      selector: row => row.description,
      // width: "20rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.description}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Trạng thái</div>,
      selector: row => row.status.value,
      // width: "10rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.status.value}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Hành động</div>,
      // width: "10rem",
      cell: row => (
        <div className="flex justify-center items-center w-full">
          {/* <BsFillEyeFill
            className="cursor-pointer text-blue-500 mr-4"
            onClick={() => handleViewDetail(row)}
          /> */}
          <BsPencilSquare
            className="cursor-pointer text-yellow-500 mr-4"
            onClick={() => handleEdit(row)}
          />
          {/* <BsFillTrashFill
            className="cursor-pointer text-red-500"
            onClick={() => handleDelete(row)}
          /> */}
        </div>
      ),
    },
  ];
  const handleChangePage = (event, value) => {
    setPage(value);
  };


  const handleAddNew = () => {
    setSelectedBrand(null);
    setModalType('add');
    setFormData({
      name: '',
      code: '',
      description: '',
      status: 'S1',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedBrand({
      ...row,
      status: row.status.id,
    });
    setModalType('edit');
    setIsModalOpen(true);
  };
  useEffect(() => {
    getAllBrand();
    getAllStatus();
  }, [page, searchValue, page]);

  const urladmin = "http://localhost:8080/api/v1/admin";
  const getAllBrand = async () => {
    try {
      const response = await fetch(`${urladmin}/brand/all?page=${page}&size=10&search=${searchValue}`, {
        headers: headers
      });
      const data = await response.json();
      setRecords(data.content);
      setTotalPage(data.totalPages);
    } catch (error) {
        toast.error("Error: ", error);
    }
  }
  
  const getAllStatus = async () => {
    try {
      const response = await fetch(`${urladmin}/support-data?type=STATUS`, {
        headers: headers
      });
      const data = await response.json();
      setStatuses(data);
      console.log(data)
    } catch (error) {
        toast.error("Error: ", error);
    }
  }
const closeModal = () => {
  setIsModalOpen(false);
  setSelectedBrand(null);
  setFormData({
    name: '',
    code: '',
    description: '',
    status: 'S1',
  });
  setModalType(null);
};
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setSelectedBrand((prevBrand) => ({
    ...prevBrand,
    [name]: value,
  }));
};

const handleEditSubmit = async (e) => {
  e.preventDefault();
  const { id, name, code, description, status } = selectedBrand;

  // Kiểm tra xem các trường có trống hay không
  if (!name || !code || !description || !status) {
    toast.error('Vui lòng điền đầy đủ thông tin.');
    return;
  }

  const requestData = {
    id,
    name,
    code,
    description,
    status,
  };
  console.log(formData);
  try {
    const response = await fetch(`${urladmin}/brand`, {
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
      
      setSelectedBrand(null);
    } else {
      console.error('Failed to update brand:', response.statusText);
    }
  } catch (error) {
    toast.error('Error:', error.message);
  }
};
const handleCreateSubmit = async () => {
  try {
    const response = await fetch(`${urladmin}/brand`, {
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
        name: '',
        code: '',
        description: '',
        status: 'S1',
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
// const statuses = [
//   { id: 'S1', value: 'OPEN' },
//   { id: 'S2', value: 'LOCK' },
//   { id: 'S3', value: 'VERIFY' },
// ]

  const renderModalContent = () => {
    switch (modalType) {
      case 'edit':
        return (
          <div className="p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Chỉnh sửa thương hiệu</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Tên thương hiệu</label>
                <input
                  type="text"
                  name="name"
                  value={selectedBrand.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Mã thương hiệu</label>
                <input
                  type="text"
                  name="code"
                  value={selectedBrand.code}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Mô tả</label>
                <textarea
                  name="description"
                  value={selectedBrand.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Trạng thái</label>
                <select
                  name="status"
                  value={selectedBrand.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white outline-none"
                  required
                >
                  <option value="">Chọn trạng thái</option>
                            {statuses.map(status => (
                              <option key={status.id} value={status.id}>{status.value}</option>
                            ))}
                </select>
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
            <h2 className="text-2xl font-bold mb-4">Thêm mới thương hiệu</h2>
            <form onSubmit={handleCreateSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Tên thương hiệu</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Mã thương hiệu</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
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
      <Link color="inherit" href="brands">
        Quản lý thương hiệu
      </Link>
    </Breadcrumbs>
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          onChange={(e) =>  setSearchValue(e.target.value)}
          placeholder="Nhập tên thương hiệu"
          className="mr-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white outline-none w-80"
        />
        <button onClick={handleAddNew} className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Thêm mới thương hiệu
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


export default AdminBrand;
