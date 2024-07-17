// DataTablesPage.jsx
import React, { useState, useEffect } from 'react';
import { BsFillEyeFill, BsPencilSquare } from 'react-icons/bs';
import DataTable from 'react-data-table-component';
import { Pagination, Breadcrumbs, Link } from '@mui/material';
import Modal from 'react-modal'; // Sử dụng Modal từ react-modal
import { toast } from "react-toastify";

const OrderPage = () => {
  const [records, setRecords] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState([]);

  const [modalType, setModalType] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const token = localStorage.getItem("token");
  
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  const getPaymentStatusStyle = (paymentMethodOrderId) => ({
    color: paymentMethodOrderId ? 'green' : 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    fontWeight: 'bold',
  });
  const id = localStorage.getItem("id");
  const urladmin = "http://localhost:8080/api/v1/user-api/order";
  const columns = [
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">ID</div>,
      selector: row => row.id,
      width: "5rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.id}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Mã đơn hàng</div>,
      selector: row => row.code,
      width: "9.5rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.code}</div>,
    },

    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Phương thức</div>,
      selector: row => row.paymentMethodType,
      // width: "15rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.paymentMethodType}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Thanh toán</div>,
      selector: row => row.paymentMethodOrderId,
      // width: "15rem",
      cell: row => <div style={getPaymentStatusStyle(row.paymentMethodOrderId)} className="flex justify-center items-center text-center w-full">{row.paymentMethodOrderId?'Đã thanh toán':'Chưa thanh toán '}</div>,
    },

    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Tổng tiền</div>,
      selector: row => row.totalPay,
      // width: "15rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.totalPay.toLocaleString('vi-VN')}đ</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Trạng thái </div>,
      selector: row => row.status.value,
      // width: "15rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.status.value}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Xem chi tiết</div>,
      // width: "10rem",
      cell: row => (
        <div className="flex justify-center items-center w-full">
          <BsFillEyeFill
            className="cursor-pointer text-blue-500 mr-4"
            onClick={() => handleViewDetail(row)}
          />
        </div>
      ),
    },
  ];
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setModalType('view');
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedOrder(row);
    setModalType('edit');
    setIsModalOpen(true);
  };
  useEffect(() => {
    getAllOrder();
  }, [page,]);

  const getAllOrder = async () => {
    try {
      const response = await fetch(`${urladmin}/${id}?page=${page}`, {
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
    setSelectedOrder(null);
    setModalType(null);
  };

  const handleEditSubmit = async () => {
    const orderCode = selectedOrder.code;
  const statusId = selectedOrder.status.id;

    try {
      const response = await fetch(`${urladmin}/order/${orderCode}?status=${statusId}`, {
        method: 'PATCH', 
        headers: headers
      });

      if (response.ok) {
        closeModal();
        setSelectedOrder(null);
        toast.success("Cập nhật thành công!");
      } else {
        console.error('Failed to update brand:', response.statusText);
      }
    } catch (error) {
      console.log('Error:', error);
      toast.error('Error:', error);
    }
  };


  const renderModalContent = () => {
    switch (modalType) {
      case 'edit':
      return (
        <div className="p-6 bg-white rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Chỉnh sửa trạng thái đơn hàng</h2>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Mã đơn hàng</label>
              <input
                type="text"
                name="code"
                value={selectedOrder.code}
                disabled
                className="w-full px-4 py-2 border rounded-lg bg-white outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Trạng thái đơn hàng</label>
              <select
                name="status"
                value={selectedOrder.status.id}
                onChange={(e) => setSelectedOrder({...selectedOrder, status: { id: e.target.value }})}
                className="w-full px-4 py-2 border rounded-lg bg-white outline-none"
              >
                {orderStatus.map((status) => (
                  <option key={status.id} value={status.id}>{status.value}</option>
                ))}
              </select>
            </div>
            <div className="mt-4 mx-auto flex justify-center">
              <button type="button" className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg" onClick={closeModal}>Hủy</button>
              <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg">Lưu</button>
            </div>
          </form>
        </div>
      );
        case 'view':
          return selectedOrder && (
            <div className="p-6 bg-white rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Chi tiết sản phẩm</h2>
              <div>
                {selectedOrder.listOrderDetail.map((item) => (
                  <div key={item.id} className="flex items-center border-b py-2">
                    <img src={`http://localhost:8080/${item.product.images[0].path}`} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item.product.name}</h3>
                      <p className="text-gray-500">{(parseFloat(item.price)).toLocaleString('vi-VN')}đ x {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-700">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <p className="text-lg font-bold">Tổng tiền: {selectedOrder.totalAmount.toLocaleString('vi-VN')}đ</p>
                <p className="text-gray-700">Thuế: {selectedOrder.tax.toLocaleString('vi-VN')}đ</p>
                <p className="text-gray-700">Phí vận chuyển: {selectedOrder.shippingCost.toLocaleString('vi-VN')}đ</p>
                <p className="text-xl font-bold">Tổng thanh toán: {selectedOrder.totalPay.toLocaleString('vi-VN')}đ</p>
              </div>
              <div className="mt-4 mx-auto flex justify-center">
                <button type="button" className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg" onClick={closeModal}>Đóng</button>
              </div>
            </div>
          );
      default:
        return null;
    }
  };
  // const orderStatus = [
  //   { id: 'O1', value: 'PROCESSING' },
  //   { id: 'O2', value: 'SHIPPING' },
  //   { id: 'O3', value: 'DELIVERED' },
  //   { id: 'O4', value: 'CANCEL' },
  // ];
  return (
    <div>

    <div className="mt-4">
      <DataTable
        columns={columns}
        data={records}
        noDataComponent={<div className="emptyData">Không có dữ liệu</div>}
        className="rounded-lg overflow-hidden shadow-lg"
      />
      <Pagination
          style={{background:"white"}}
        count={totalPage}
        boundaryCount={2}
        siblingCount={1}
        color="primary"
        showFirstButton
        showLastButton
        className=" flex justify-end"
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


export default OrderPage;
