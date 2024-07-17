import React, {useEffect, useState} from "react";
import FormInput from "./FormInput";
import { Form, Link } from "react-router-dom";
import FormSelect from "./FormSelect";
import axios from "axios";

const Filters = ({setProducts}) => {
  const [selectCategoryList, setSelectCategoryList] = useState(["all"]);
  const [selectBrandList, setSelectBrandList] = useState(["all"]);
  const [selectGenderList] = useState(["", "G1","G2"]);
  const [sortListByName] = useState(["asc", "desc"]);
    const [sortListByPrice] = useState(["asc", "desc"]);
useEffect(() => {
    const fetchData = async () => {
        try {
          const [responseBrand, responseCategory] = await Promise.all([
            axios.get("http://localhost:8080/api/v1/client-api/brand/all"),
            axios.get("http://localhost:8080/api/v1/client-api/type/all"),
          ]);
            const brandList = responseBrand.data.map((brand) => brand.name);
            setSelectBrandList(["all", ...brandList]);
            console.log("brandList"+selectBrandList);
            const categoryList = responseCategory.data.map((category) => category.name);
            setSelectCategoryList(["all", ...categoryList]);
            console.log("categoryList"+selectCategoryList);
          
        } catch (error) {
            console.error("Error fetching filters:", error);
        }
    }
    fetchData();
}
    , []);
  const handleSubmit = () => {
    return (e) => {
      e.preventDefault();
      const productNames = e.target.search.value;
      const category = e.target.category.value;
      const brand = e.target.brand.value;
      const sortName = e.target.orderName.value;
      const sortPrice = e.target.orderPrice.value;
      const gender = e.target.gender.value;
      let query = `?page=1&size=10`;
      if (productNames) {
        query += `&search=${productNames}`;
      }
      if (category !== "all") {
        query += `&type=${category}`;
      }
      if (brand !== "all") {
        query += `&brand=${brand}`;
      }
      if (sortName !== "asc") {
        query += `&sort=${true}`;
      }else{
        query += `&sort=${false}`;
      }
      // if (gender == "all") {
        query += `&sex=${gender}`;
      // }
      fetch("http://localhost:8080/api/v1/client-api/product/all" + query)
        .then((res) => res.json())
        .then((res) => {
          const data = res.content;
            console.log("search result", data);

            setProducts(data);
        })
        .catch((err) => {
          console.error("search failed", err);
        });
    };
  };
  return (
    <Form 
    onSubmit={handleSubmit()}
    className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue=""
      />
      {/* CATEGORIES */}
      <FormSelect
        label="select category"
        name="category"
        list={selectCategoryList}
        size="select-sm"
        defaultValue="all"
      />
      {/* COMPANIES */}
      <FormSelect
        label="select brand"
        name="brand"
        list={selectBrandList}
        size="select-sm"
        defaultValue="all"
      />
      {/* ORDER */}
      <FormSelect
        label="sort by name"
        name="orderName"
        list={sortListByName}
        size="select-sm"
        defaultValue="a-z"
      />
        {/* Sort by price */}
        <FormSelect
            label="sort by price"
            name="orderPrice"
            list={sortListByPrice}
            size="select-sm"
            defaultValue="asc"
        />
      {/* Producer */}
      <FormSelect
        label="Select gender"
        name="gender"
        list={selectGenderList}
        size="select-sm"
        defaultValue="all"
      />
      <button
        type="submit"
        className="btn bg-blue-600 hover:bg-blue-500 text-white btn-sm"
      >
        search
      </button>
      <Link to="/shop?page=1" className="btn btn-primary btn-sm">
        reset
      </Link>
    </Form>
  );
};


export default Filters;
