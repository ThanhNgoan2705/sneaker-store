import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [id, setId] = useState(localStorage.getItem("id"));
  const [userData, setUserData] = useState({});
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const wishItems = useSelector((state) => state.wishlist.wishItems);
  const [userFormData, setUserFormData] = useState({
    id: "",
    name: "",
    fullname: "",
    email: "",
    phone: "",
    adress: "",
    password: "",
  });
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const response = await axios(`http://localhost:8080/api/v1/account/${id}`);
      const data = response.data;
      setUserFormData({
        name: data.username,
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        password: data.password,
      });
    } catch (error) {
      toast.error("Error: ", error.response);
    }
  };

  useEffect(() => {
    if (loginState) {
      getUserData();
    } else {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {

      const getResponse = await axios(`http://localhost:8080/api/v1/account/${id}`);
      const userObj = getResponse.data;


      const putResponse = await axios.patch(`http://localhost:8080/api/v1/account/${id}`, {
        id: id,
        fullname: userFormData.fullname,
        phone: userFormData.phone,
        gender: userFormData.gender,
        password: userFormData.password,
        // userWishlist: await userObj.userWishlist

      });
      const putData = putResponse.data;
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      <SectionTitle title="User Profile" path="Home | User Profile" />
      <form className="max-w-7xl mx-auto text-center px-10" onSubmit={updateProfile}>
        <div className="grid grid-cols-3 max-lg:grid-cols-1">
          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs disabled:opacity-50 disabled:bg-gray-200"
              value={userFormData.name}
              onChange={(e) => { setUserFormData({ ...userFormData, name: e.target.value }) }}
              readOnly={true}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your FullName</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.fullname}
              onChange={(e) => { setUserFormData({ ...userFormData, fullname: e.target.value }) }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.email}
              onChange={(e) => { setUserFormData({ ...userFormData, email: e.target.value }) }}
              readOnly={true}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Phone</span>
            </label>
            <input
              type="tel"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.phone}
              onChange={(e) => { setUserFormData({ ...userFormData, phone: e.target.value }) }}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Gender</span>
            </label>
            {/* <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.adress}
              onChange={(e) => {setUserFormData({...userFormData, adress: e.target.value})}}
            /> */}
            <select className="select select-bordered w-full lg:max-w-xs"
            onChange={(e) => { setUserFormData({ ...userFormData}) }}
            >
              <option value="">Select gender</option>
              <option value="0">Male</option>
              <option value="1">Female</option>
            </select>
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.password}
              onChange={(e) => { setUserFormData({ ...userFormData, password: e.target.value }) }}
            />
          </div>
        </div>
        <button
          className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white mt-10"
          type="submit"
        >
          Update Profile
        </button>
      </form>
    </>
  );
};

export default Profile;
