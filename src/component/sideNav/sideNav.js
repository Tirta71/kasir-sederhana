import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import axios from "axios";

const SideNav = ({ activeCategory, onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://646f8bf209ff19b120877364.mockapi.io/login/menus")
      .then((response) => {
        const uniqueCategories = Array.from(
          new Set(response.data.map((menu) => menu.jenis))
        );
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ListGroup>
      <h1>List Menu</h1>
      {categories.map((category) => (
        <ListGroup.Item
          key={category}
          active={category === activeCategory}
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default SideNav;
