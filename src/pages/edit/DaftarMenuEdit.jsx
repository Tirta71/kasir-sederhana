import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import MenuEdit from "../../component/MenuEdit/MenuEdit";
import SideNav from "../../component/sideNav/sideNav";
import NavbarKu from "../../component/navbar/navbar";
import { useNavigate } from "react-router-dom";
import "./daftarMenu.css";
const EditMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleTambahMenu = () => {
    navigate("/tambah-menu");
  };

  return (
    <div>
      <NavbarKu active={false} />
      <Row className="mx-3 mt-2">
        <Col md={2}>
          <h2 className="menu-list">Menu List</h2>
          <h1 className="text-center edit-menu ">Edit Menu</h1>
          <SideNav
            activeCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />

          <Button
            className="mt-3 mb-3"
            onClick={handleTambahMenu}
            style={{ width: "100%" }}
          >
            Tambah Menu
          </Button>
        </Col>
        <Col md={10}>
          <h1 className="text-center text-mobile">Edit Menu</h1>
          <MenuEdit selectedCategory={selectedCategory} />
        </Col>
      </Row>
    </div>
  );
};

export default EditMenu;
