import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const CategoriesList = ({ catAnchorEl, handleCloseCat }) => {
  const { categories } = useSelector((store) => store.items);

  return (
    <Menu
      id="category-menu"
      anchorEl={catAnchorEl}
      keepMounted
      open={Boolean(catAnchorEl)}
      onClose={handleCloseCat}
    >
      {categories.map((item) => (
        <MenuItem key={item } onClick={()=>handleCloseCat(item)}>{item}</MenuItem>
      ))}
    </Menu>
  );
};

export default CategoriesList;
