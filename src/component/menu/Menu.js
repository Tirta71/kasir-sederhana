import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import swal from "sweetalert";
import "./menu.css";

const MenuUtama = ({ selectedCategory, setKeranjang, keranjang }) => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    axios
      .get("https://646f8bf209ff19b120877364.mockapi.io/login/menus")
      .then((response) => {
        let filteredMenus = response.data;

        if (selectedCategory) {
          filteredMenus = response.data.filter(
            (menu) => menu.jenis === selectedCategory
          );
        }

        setMenus(filteredMenus);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedCategory]);

  const addToCart = (menu) => {
    const existingItem = keranjang.find((item) => item.id === menu.id);

    if (existingItem) {
      setKeranjang((prevKeranjang) =>
        prevKeranjang.map((item) =>
          item.id === menu.id ? { ...item, jumlah: item.jumlah + 1 } : item
        )
      );
    } else {
      const newItem = { ...menu, jumlah: 1 };
      setKeranjang((prevKeranjang) => [...prevKeranjang, newItem]);
    }

    swal("Sucess", "Pesanan Berhasil Ditambahkan", "success");
  };

  return (
    <div>
      <div className="d-flex flex-wrap container-card">
        {menus.map((menu) => (
          <Card
            key={menu.id}
            style={{ width: "250px", height: "300px", overflow: "hidden" }}
            className="m-2 myCard shadow"
            onClick={() => addToCart(menu)}
          >
            <Card.Img
              variant="top"
              src={menu.gambar}
              style={{ objectFit: "cover", height: "200px" }}
            />

            <Card.Body>
              <Card.Title>{menu.nama}</Card.Title>
              <Card.Text>Harga: {menu.harga}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MenuUtama;
