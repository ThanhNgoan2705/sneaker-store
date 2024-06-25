

import React, { useState, useEffect } from 'react';
import { BsFillEyeFill, BsPencilSquare, BsFillTrashFill } from 'react-icons/bs';
// import axios from "axios";
import DataTable from 'react-data-table-component';
import { Pagination, Breadcrumbs, Link } from '@mui/material';
import Modal from 'react-modal'; // Sử dụng Modal từ react-modal
import { toast } from "react-toastify";

const AdminProduct = () => {
  const [records, setRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // Loại chức năng hiện tại (view, edit, add)
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [sort, setSort] = useState(false);
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [sex, setSex] = useState("");

  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [sexes, setSexes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  
  const token = localStorage.getItem("token");
  
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };


  const columns = [
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">ID</div>,
      selector: row => row.id,
      width: "6rem",
      cell: row => <div className="flex justify-center items-center text-center w-full">{row.id}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Hình ảnh</div>,
      selector: row => row.images[0].path,
      cell: row => <img height="50" alt={row.name} src={`http://localhost:8080/${row.images[0].path}`} style={{paddingBottom:"1rem", paddingTop:"1rem"}} />
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Tên sản phẩm</div>,
      selector: row => row.name,
      // width: "8rem",
      cell: row => <div className="flex justify-center items-center w-full">{row.name}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Giày cho</div>,
      selector: row => row.sex.value,
      // width: "8rem",
      cell: row => <div className="flex justify-center items-center w-full">{row.sex.value}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Loại giày</div>,
      selector: row => row.type.name,
      // width: "8rem",
      cell: row => <div className="flex justify-center items-center w-full">{row.type.name}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Nhãn hiệu</div>,
      selector: row => row.brand.name,
      // width: "10rem",
      cell: row => <div className="flex justify-center items-center w-full">{row.brand.name}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Trạng thái</div>,
      selector: row => row.status.value,
      cell: row => <div className="flex justify-center items-center w-full">{row.status.value}</div>,
    },
    {
      name: <div className="text-blue-500 font-bold text-center text-lg w-full">Hành động</div>,
      // width: "10rem",
      cell: row => (
        <div className="flex justify-center items-center w-full">
          <BsFillEyeFill
            className="cursor-pointer text-blue-500 mr-4"
            onClick={() => handleViewDetail(row)}
          />
          <BsPencilSquare
            className="cursor-pointer text-yellow-500 mr-4"
            onClick={() => handleEdit(row)}
          />
        </div>
      ),
    },
  ];

  const handleViewDetail = (row) => {
    setSelectedProduct(row);
    setModalType('view');
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedProduct({
      ...row,
      status: row.status.id,
      sex: row.sex.id,
      type: row.type.id,
      brand: row.brand.id, // Set status to the id of the status
      // Các thuộc tính khác
    });
    setModalType('edit');
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setModalType('add');
    setIsModalOpen(true);
  };

  // const handleDelete = (row) => {
  //   // Xử lý xóa
  // };

  useEffect(() => {
    getAllProduct();
    getAllBrand();
    getAllKind();
    getAllGender();
    getAllStatus();
  }, [page, searchValue, sort, brand, type, sex]);

  const url = "http://localhost:8080/api/v1/client-api/";
  const urladmin = "http://localhost:8080/api/v1/admin";
  
  const getAllProduct = async () => {
    try {
      const response = await fetch(`${url}product/all?page=${page}&size=10&search=${searchValue}&sort=${sort}&filter=name&brand=${brand}&type=${type}&sex=${sex}&active=false`, {
        headers: headers
      });
      const data = await response.json();
      setRecords(data.content);
      setTotalPage(data.totalPages);
      setPage(data.number + 1);
      // console.log(data);
  } catch (error) {
      toast.error("Error: ", error);
  }
  };
  const getAllBrand = async () => {
    try {
      const response = await fetch(`${url}brand/all`);
      const data = await response.json();
      setBrands(data);
      console.log(data);
    } catch (error) {
        toast.error("Error: ", error);
    }
  }
  const getAllKind = async () => {
    try {
      const response = await fetch(`${url}type/all`);
      const data = await response.json();
      setTypes(data);
    } catch (error) {
        toast.error("Error: ", error);
    }
  }
  const getAllGender = async () => {
    try {
      const response = await fetch(`${urladmin}/support-data?type=GENDER`, {
        headers: headers
      });
      const data = await response.json();
      setSexes(data);
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
    setSelectedProduct(null);
    setModalType(null);
  };

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  // Sử dụng hàm handleChange
  const handleInputChange = (e) => handleChange(e, setSelectedProduct);
  const handleProductDataChange = (e) => handleChange(e, setProductData);
  
  const handleSizeChange = (e, sizeId, field) => {
    const { value } = e.target;
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      sizes: prevProduct.sizes.map((size) =>
        size.id === sizeId ? { ...size, [field]: value } : size
      ),
    }));
  };
  const handleRemoveImage = (imageId) => {
    const updatedImages = selectedProduct.images.filter(image => image.id !== imageId);
    const updatedProduct = {
      ...selectedProduct,
      images: updatedImages,
    };
    console.log("updatedImages", updatedImages)
    setSelectedProduct(updatedProduct);
    console.log("selectedProduct", selectedProduct);
  };
  
  const handleAddSize = () => {
    const newSize = {
      name: '',
      quantity: '',
      price: '',
      salePercent: '',
      description: ''
    };
    setSelectedProduct(prevProduct => ({
      ...prevProduct,
      sizes: [...prevProduct.sizes, newSize]
    }));
  };
  const handleRemoveSize = (sizeId) => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      sizes: prevProduct.sizes.filter((size) => size.id !== sizeId),
    }));
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();

  const productDataCopy = {
    ...selectedProduct,
    images: selectedProduct.images.map((image) => ({
      ...image,
      thumbnail: false
    })),
  };

  const formData = new FormData();
  formData.append('productDTO', new Blob([JSON.stringify(productDataCopy)], {
    type: "application/json"
  }));

  // selectedProduct.images.forEach((image) => {
  //   formData.append('files', image.file);
  // });
  const hasNewImages = selectedProduct.images.some(image => image.isNew);
    if (hasNewImages) {
        selectedProduct.images.forEach((image) => {
            formData.append('files', image.file);
        });
    } else {
        formData.append('files', null);
    }

  // Kiểm tra formData trong console
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }
  
    try {
      
  
      const response = await fetch(`${urladmin}/product`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
        credentials: 'include',
      });
  
      if (response.ok) {
        const newProduct = await response.json();
        console.log('Product posted successfully:', newProduct);
        setRecords((prevRecords) => [...prevRecords, newProduct]);
        toast.success("Cập nhật thành công!");
        closeModal();
        setProductData({ images: [] });
      } else {
        console.error('Failed to post product:', response.statusText);
        let errorMessage = 'Failed to post product';
        if (response.statusText) {
          errorMessage += `: ${response.statusText}`;
          
        console.error('Failed to post product:', errorMessage);
        }
        toast.error('Failed to post product:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Error: ${error.message}`);
    }
  };
  


  const renderModalContent = () => {
    switch (modalType) {
      case 'view':
        return (
          <div className="p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{selectedProduct.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="mb-2"><span className="font-semibold">Mã sản phẩm:</span> {selectedProduct.code}</p>
                <p className="mb-2"><span className="font-semibold">Mô tả:</span> {selectedProduct.shortDescription}</p>
                <p className="mb-2"><span className="font-semibold">Mô tả chi tiết:</span> {selectedProduct.description}</p>
                <p className="mb-2"><span className="font-semibold">Loại giày:</span> {selectedProduct.type.name}</p>
                <p className="mb-2"><span className="font-semibold">Giới tính:</span> {selectedProduct.sex.value}</p>
                <p className="mb-2"><span className="font-semibold">Trạng thái:</span> {selectedProduct.status.value}</p>
                <p className="mb-2"><span className="font-semibold">Nhãn hiệu:</span> {selectedProduct.brand.name}</p>

                <h3 className="text-lg font-semibold mt-4 mb-2">Các size có sẵn:</h3>
                <ul className="list-disc pl-6 mb-4">
                  {selectedProduct.sizes.map(size => (
                    <li key={size.id} className="mb-1">
                      <span className="font-semibold">Size {size.name}:</span> Số lượng: {size.quantity}, Giá: {(parseFloat(size.price)).toLocaleString('vi-VN')}đ
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mt-4 mb-2">Hình ảnh sản phẩm:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedProduct.images.map(image => (
                    <img key={image.id} src={`http://localhost:8080/${image.path}`} alt={selectedProduct.name} className="rounded-lg shadow-md" />
                  ))}
                </div>
              </div>
            </div>
          </div>

        );
      case 'edit':
        return (
          <div className="p-6 bg-white rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Chỉnh sửa sản phẩm</h2>
          <form onSubmit={handleEditSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Tên sản phẩm</label>
                  <input
                    className="w-full px-3 py-2 border rounded-lg bg-white outline-none"
                    type="text"
                    id="name"
                    value={selectedProduct.name}
                    onChange={handleInputChange}
                    name="name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="code">Mã sản phẩm</label>
                  <input
                    className="w-full px-3 py-2 border rounded-lg bg-white outline-none"
                    type="text"
                    id="code"
                    value={selectedProduct.code}
                    onChange={handleInputChange}
                    name="code"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">Mô tả</label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg bg-white outline-none"
                    id="description"
                    value={selectedProduct.shortDescription}
                    onChange={handleInputChange}
                    name="description"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">Mô tả chi tiết</label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg bg-white outline-none"
                    id="description"
                    value={selectedProduct.description}
                    onChange={handleInputChange}
                    name="description"
                  ></textarea>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="status">Trạng thái</label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg bg-white outline-none"
                    id="status"
                    value={selectedProduct.status}
                    onChange={handleInputChange}
                    name="status"
                  >
                    {statuses.map(status => (
                      <option key={status.id} value={status.id}>
                        {status.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="brand">Nhãn hiệu</label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg bg-white outline-none"
                    id="brand"
                    value={selectedProduct.brand}
                    onChange={handleInputChange}
                    name="brand"
                  >
                    {brands.map(brand => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="type">Loại giày</label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg bg-white outline-none"
                    id="type"
                    value={selectedProduct.type}
                    onChange={handleInputChange}
                    name="type"
                  >
                    {types.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="sex">Giới tính</label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg bg-white outline-none"
                    id="sex"
                    value={selectedProduct.sex}
                    onChange={handleInputChange}
                    name="sex"
                  >
                    {sexes.map(sex => (
                      <option key={sex.id} value={sex.id}>
                        {sex.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mt-4 mb-2">Các size có sẵn</h3>
              <ul className="list-disc pl-6 mb-4">
                {selectedProduct.sizes.map((size, index) => (
                  <li key={index} className="mb-1 items-center">
                    <span className="font-semibold">Size {size.name}:</span>
                    <div className="flex">
                      <span className="mr-1 my-auto">Tên:</span>
                      <input
                        className="px-2 py-1 border rounded-lg bg-white outline-none w-20"
                        type="text"
                        value={size.name}
                        onChange={e => handleSizeChange(e, size.id, 'name')}
                        name={`name-${size.id}`}
                      />
                      <span className="mr-1 ml-2 my-auto w-12 text-center">Số lượng:</span>
                      <input
                        className="px-2 py-1 border rounded-lg bg-white outline-none w-20"
                        type="text"
                        value={size.quantity}
                        onChange={e => handleSizeChange(e, size.id, 'quantity')}
                        name={`quantity-${size.id}`}
                      />
                      <span className="mr-1 ml-2 my-auto w-12 text-center">Giá:</span>
                      <input
                        className="px-2 py-1 border rounded-lg bg-white outline-none w-28"
                        type="text"
                        value={size.price}
                        onChange={e => handleSizeChange(e, size.id, 'price')}
                        name={`price-${size.id}`}
                      />
                      <span className="mr-1 ml-2 my-auto w-12 text-center">Giảm giá:</span>
                      <input
                        className="px-2 py-1 border rounded-lg bg-white outline-none w-20"
                        type="text"
                        value={size.salePercent}
                        onChange={e => handleSizeChange(e, size.id, 'salePercent')}
                        name={`salePercent-${size.id}`}
                      />
                      <span className="mr-1 ml-2 my-auto w-12 text-center">Mô tả:</span>
                      <input
                        className="px-2 py-1 border rounded-lg bg-white outline-none w-28"
                        type="text"
                        value={size.description}
                        onChange={e => handleSizeChange(e, size.id, 'description')}
                        name={`description-${size.id}`}
                      />
                      <button
                        type="button"
                        className="ml-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg"
                        onClick={() => handleRemoveSize(size.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button 
                type="button"
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg mt-2"
                onClick={handleAddSize}
              >
                Thêm size
              </button>
            </div>
          <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-2">Hình ảnh</label>
              <div className="flex items-center space-x-4 mb-4 overflow-y-auto">
                {selectedProduct.images.map(image => (
                  <div key={image.id} className="relative">
                    <img src={`http://localhost:8080/${image.path}`} alt={`image-${image.id}`} className="w-20 h-20 object-cover" />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full cursor-pointer"
                      onClick={() => handleRemoveImage(image.id)}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M12.707 11.293a1 1 0 1 1-1.414 1.414L10 11.414l-1.293 1.293a1 1 0 1 1-1.414-1.414L8.586 10 7.293 8.707a1 1 0 0 1 1.414-1.414L10 8.586l1.293-1.293a1 1 0 0 1 1.414 1.414L11.414 10l1.293 1.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                <input
                  type="file" multiple
                  className="px-3 py-2 border rounded-lg bg-white outline-none"
                  onChange={(e) => handleFileChange(e, false)}
                />
              </div>
          </div>
            <div className="mt-4 mx-auto flex justify-center">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg">Lưu</button>
              <button type="button" className="ml-2 px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg" onClick={closeModal}>Hủy</button>
            </div>
          </form>
        </div>
        );
        case 'add':
          return (
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">Thêm mới sản phẩm</h2>
              <form onSubmit={handleCreateSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-semibold mb-1">Tên sản phẩm</label>
                  <input type="text" id="name" name="name" className="border border-gray-300 px-3 py-2 rounded-lg w-full bg-white outline-none" onChange={handleProductDataChange} required />
                </div>
                <div className="mb-4">
                  <label htmlFor="code" className="block text-sm font-semibold mb-1">Mã sản phẩm</label>
                  <input type="text" id="code" name="code" className="border border-gray-300 px-3 py-2 rounded-lg w-full bg-white outline-none" onChange={handleProductDataChange} required />
                </div>
                <div className="mb-4">
                  <label htmlFor="shortDescription" className="block text-sm font-semibold mb-1">Mô tả</label>
                  <textarea id="shortDescription" name="shortDescription" className="border border-gray-300 px-3 py-2 rounded-lg w-full bg-white outline-none" rows="4" onChange={handleProductDataChange} required />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-semibold mb-1">Mô tả chi tiết</label>
                  <textarea id="description" name="description" className="border border-gray-300 px-3 py-2 rounded-lg w-full bg-white outline-none" rows="4" onChange={handleProductDataChange} required />
                </div>
                <div className="mb-4">
                  <label htmlFor="type" className="block text-sm font-semibold mb-1">Loại giày</label>
                  <select id="type" name="type" className="border border-gray-300 px-3 py-2 rounded-lg w-full bg-white outline-none" onChange={handleProductDataChange} required>
                    <option value="">Chọn loại giày</option>
                    {types.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="sex" className="block text-sm font-semibold mb-1">Giới tính</label>
                  <select id="sex" name="sex" className="border border-gray-300 px-3 py-2 rounded-lg w-full bg-white outline-none" onChange={handleProductDataChange} required>
                    <option value="">Chọn giới tính</option>
                    {sexes.map(sex => (
                      <option key={sex.id} value={sex.id}>{sex.value}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="brand" className="block text-sm font-semibold mb-1">Nhãn hiệu</label>
                  <select id="brand" name="brand" className="border border-gray-300 px-3 py-2 rounded-lg w-full bg-white outline-none" onChange={handleProductDataChange} required>
                    <option value="">Chọn nhãn hiệu</option>
                    {brands.map(brand => (
                      <option key={brand.id} value={brand.id}>{brand.code}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-1">Các size có sẵn</label>
                  {sizes.map((size, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input type="text" className="border border-gray-300 px-3 py-2 rounded-lg w-40 mr-2 bg-white outline-none" placeholder="Size" value={size.name} onChange={handleSizeChange1(index, 'name')} required />
                      <input type="text" className="border border-gray-300 px-3 py-2 rounded-lg w-40 mr-2 bg-white outline-none" placeholder="Số lượng" value={size.quantity} onChange={handleSizeChange1(index, 'quantity')} required />
                      <input type="text" className="border border-gray-300 px-3 py-2 rounded-lg w-40 mr-2 bg-white outline-none" placeholder="Giá" value={size.price} onChange={handleSizeChange1(index, 'price')} required />
                      <input type="text" className="border border-gray-300 px-3 py-2 rounded-lg w-40 mr-2 bg-white outline-none" placeholder="Phần trăm giảm" value={size.salePercent} onChange={handleSizeChange1(index, 'salePercent')} required />
                      <input type="text" className="border border-gray-300 px-3 py-2 rounded-lg w-40 mr-2 bg-white outline-none" placeholder="Mô tả" value={size.description} onChange={handleSizeChange1(index, 'description')} required />
                      <button type="button" className="px-3 py-1 bg-red-500 text-white font-semibold rounded-lg" onClick={() => removeSize(index)}>Xóa</button>
                    </div>
                  ))}
                  <button type="button" className="px-3 py-1 bg-blue-500 text-white font-semibold rounded-lg" onClick={addSize}>Thêm size</button>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 font-semibold mb-2">Hình ảnh</label>
                  <div className="flex items-center space-x-4 mb-4 overflow-y-auto">
                    {productData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img src={image.path} alt={`image-${index}`} className="w-20 h-20 object-cover rounded-lg" />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full cursor-pointer"
                          onClick={() => handleRemoveImage1(image.file)}
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fillRule="evenodd"
                              d="M12.707 11.293a1 1 0 1 1-1.414 1.414L10 11.414l-1.293 1.293a1 1 0 1 1-1.414-1.414L8.586 10 7.293 8.707a1 1 0 0 1 1.414-1.414L10 8.586l1.293-1.293a1 1 0 0 1 1.414 1.414L11.414 10l1.293 1.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <input
                      type="file" multiple
                      className="px-3 py-2 border rounded-lg bg-white outline-none"
                      onChange={(e) => handleFileChange(e, true)}
                    />
                  </div>
                </div>
                <div className="mt-4 mx-auto flex justify-center">
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg">Lưu</button>
                  <button type="button" className="ml-2 px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg" onClick={closeModal}>Hủy</button>
                </div>
              </form>
            </div>
          );
        default:
          return null;
      }
    };
    const [productData, setProductData] = useState({
      name: '',
      code: '',
      shortDescription:'',
      description: '',
      status: 'S1',
      type: '',
      sex: '',
      brand: '',
      sizes: [],
      images: [],
    });

    const [sizes, setSizes] = useState([{ name: '', quantity: '', price: '', salePercent:'', description:'' }]);

  
    const handleSizeChange1 = (index, field) => (e) => {
      const newSizes = [...sizes];
      newSizes[index][field] = e.target.value;
      setSizes(newSizes);
      setProductData({ ...productData, sizes: newSizes });
    };
  
    const addSize = () => {
      setSizes([...sizes, { name: '', quantity: '', price: '', salePercent:'', description:'' }]);
    };
  
    const removeSize = (index) => {
      const newSizes = [...sizes];
      newSizes.splice(index, 1);
      setSizes(newSizes);
      setProductData({ ...productData, sizes: newSizes });
    };
    const handleFileChange = (e, isProductData = false) => {
      const files = e.target.files;
      const newImages = Array.from(files).map((file) => ({
        file: file,
        path: URL.createObjectURL(file), // Tạo đường dẫn URL cho file
        name: file.name,
        isNew: true
      }));
    
      if (isProductData) {
        setProductData((prevData) => ({
          ...prevData,
          images: [...prevData.images, ...newImages]
        }));
      } else {
        setSelectedProduct((prevProduct) => ({
          ...prevProduct,
          images: [...prevProduct.images, ...newImages]
        }));
      }
    };
    
    const handleRemoveImage1 = (fileToRemove) => {
      const filteredImages = productData.images.filter(image => image.file !== fileToRemove);
      setProductData({ ...productData, images: filteredImages });
    };

    const handleCreateSubmit = async (e) => {
      e.preventDefault();

    const productDataCopy = {
      ...productData,
      images: productData.images.map((image) => ({
        ...image,
        thumbnail: false
      })),
    };

    const formData = new FormData();
    formData.append('productDTO', new Blob([JSON.stringify(productDataCopy)], {
      type: "application/json"
    }));

    productData.images.forEach((image) => {
      formData.append('files', image.file);
    });

    // Kiểm tra formData trong console
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    
      try {
        
    
        const response = await fetch(`${urladmin}/product`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData,
          credentials: 'include',
        });
        
    
        if (response.ok) {
          const newProduct = await response.json();
          console.log('Product posted successfully:', newProduct);
          setRecords((prevRecords) => [...prevRecords, newProduct]);
          toast.success("Tạo thành công!");
          closeModal();
          setProductData({ images: [] });
        } else {
          console.error('Failed to post product:', response.statusText);
          toast.error('Failed to post product:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error(`Error: ${error.message}`);
      }
    };



  return (
    <div>
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/admin">
        Admin Home
      </Link>
      <Link color="inherit" href="#">
        Product
      </Link>
    </Breadcrumbs>
    <div className="mt-4">
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-4">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Nhập loại sản phẩm mới"
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white outline-none w-80"
        />
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={sort}
            onChange={(e) => setSort(e.target.checked)}
            className="mt-1"
          />
          <label className="mt-1">Sắp xếp</label>
        </div>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white outline-none"
        >
          <option value="">Chọn thương hiệu</option>
          {brands.map(brand => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white outline-none"
        >
          <option value="">Chọn loại sản phẩm</option>
          {types.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
        </select>
        <select
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          className="px-1 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white outline-none"
        >
          <option value="">Chọn giới tính</option>
          {sexes.map(sex => (
                      <option key={sex.id} value={sex.id}>
                        {sex.value}
                      </option>
                    ))}
        </select>
      </div>
      <button
        onClick={handleAddNew}
        className="btn btn-primary px-2 py-1 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Thêm mới sản phẩm
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
  className="Modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50 w-11/12 max-w-5xl"
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

export default AdminProduct;
