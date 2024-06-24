

import React, { memo } from "react";

const SelectSize = ({ sizeList, size, setSize, setStock }) => {

  return (
    <>
      <select className="select select-info w-full max-w-xs select-md"
       value={size} onChange={(event) => {
        const newSize = event.target.value;
        const sizeItem = sizeList.find((item) => item.name === newSize);
        if (sizeItem) {
          setSize(newSize);
          setStock(sizeItem.quantity);
        }
     
      }}>
        <option disabled className="text-lg">
          Pick your size
        </option>
        {sizeList.map((item, index) => (
          // Assuming each 'item' in 'sizeList' is an object with a 'name' property
          <option value={item.name} key={index} className="text-xl">
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default memo(SelectSize);
