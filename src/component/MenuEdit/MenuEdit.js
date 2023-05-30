import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import swal from "sweetalert";
import "./menuEdit.css";
import { useNavigate } from "react-router-dom";

const MenuEdit = ({ selectedCategory, setKeranjang, keranjang }) => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

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

  const editMenu = (menuId) => {
    navigate(`/edit-menu/${menuId}`);
  };

  const deleteMenu = (menuId) => {
    axios
      .delete(
        `https://646f8bf209ff19b120877364.mockapi.io/login/menus/${menuId}`
      )
      .then((response) => {
        console.log("Menu berhasil dihapus:", response.data);
        swal("Sukses", "Menu berhasil dihapus", "success");
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan dalam menghapus menu:", error);
        swal("Error", "Terjadi kesalahan dalam menghapus menu", "error");
      });
  };

  const handleDeleteMenu = (menuId) => {
    swal({
      title: "Apakah Anda yakin?",
      text: "Menu akan dihapus permanen",
      icon: "warning",
      buttons: ["Batal", "Hapus"],
      dangerMode: true,
    }).then((confirmed) => {
      if (confirmed) {
        deleteMenu(menuId);
      }
    });
  };

  return (
    <>
      <div className="desktop-view">
        <div className="d-flex flex-wrap container-card ">
          {menus.map((menu) => (
            <Card
              key={menu.id}
              style={{ width: "200px", height: "300px", overflow: "hidden" }}
              className="m-2 myCard shadow"
            >
              <Card.Img
                variant="top"
                src={menu.gambar}
                style={{ objectFit: "cover", height: "150px" }}
              />

              <Card.Body>
                <Card.Title>{menu.nama}</Card.Title>
                <Card.Text>Harga: {menu.harga}</Card.Text>

                <div className="button-only">
                  <Button
                    style={{ marginRight: "10px" }}
                    onClick={() => editMenu(menu.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="btn-danger"
                    onClick={() => handleDeleteMenu(menu.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      {/* Tampilan Mobile */}
      <div className="mobile-container">
        {menus.map((menu) => (
          <div className="mobile-card" key={menu.id}>
            <div className="mobile-image">
              <img src={menu.gambar} alt={menu.nama} />
            </div>
            <div className="mobile-details">
              <h3>{menu.nama}</h3>
              <p>Harga: {menu.harga}</p>
              <div className="button-only">
                <Button onClick={() => editMenu(menu.id)}>Edit</Button>
                <Button
                  className="btn-danger"
                  onClick={() => handleDeleteMenu(menu.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MenuEdit;
