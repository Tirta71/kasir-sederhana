import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import sateAyam from "../../assets/images/makanan/sate-ayam.jpg";
import nasiGorengTelur from "../../assets/images/makanan/nasi-goreng-telor.jpg";
import nasiRames from "../../assets/images/makanan/nasi-rames.jpg";
import mieGoreng from "../../assets/images/makanan/mie-goreng.jpg";
import lontongSayur from "../../assets/images/makanan/lontong-opor-ayam.jpg";
import bakso from "../../assets/images/makanan/bakso.jpg";
import mieAyamBakso from "../../assets/images/makanan/mie-ayam-bakso.jpg";
import pangsit from "../../assets/images/cemilan/pangsit.jpg";
import kentangGoreng from "../../assets/images/cemilan/kentang-goreng.jpg";
import cheeseBurger from "../../assets/images/cemilan/cheese-burger.jpg";
import coffeLate from "../../assets/images/minuman/coffe-late.jpg";
import esJeruk from "../../assets/images/minuman/es-jeruk.jpg";
import tehHangat from "../../assets/images/minuman/teh-hangat.jpg";
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
    // Cek apakah item sudah ada di keranjang
    const existingItem = keranjang.find((item) => item.id === menu.id);

    if (existingItem) {
      // Jika item sudah ada, tambahkan jumlahnya
      setKeranjang((prevKeranjang) =>
        prevKeranjang.map((item) =>
          item.id === menu.id ? { ...item, jumlah: item.jumlah + 1 } : item
        )
      );
    } else {
      // Jika item belum ada, tambahkan item baru dengan jumlah 1
      const newItem = { ...menu, jumlah: 1 };
      setKeranjang((prevKeranjang) => [...prevKeranjang, newItem]);
    }

    swal("Sucess", "Pesanan Berhasil Ditambahkan", "success");
  };

  return (
    <div>
      <h1 className="text-center">Daftar Menu</h1>
      <div className="d-flex flex-wrap container-card">
        {menus.map((menu) => (
          <Card
            key={menu.id}
            style={{ width: "18rem" }}
            className="m-2 myCard shadow"
            onClick={() => addToCart(menu)}
          >
            {menu.jenis === "Makanan" && (
              <Card.Img
                variant="top"
                src={
                  menu.gambar === "sate-ayam.jpg"
                    ? sateAyam
                    : menu.gambar === "nasi-goreng-telor.jpg"
                    ? nasiGorengTelur
                    : menu.gambar === "nasi-rames.jpg"
                    ? nasiRames
                    : menu.gambar === "mie-goreng.jpg"
                    ? mieGoreng
                    : menu.gambar === "lontong-opor-ayam.jpg"
                    ? lontongSayur
                    : menu.gambar === "bakso.jpg"
                    ? bakso
                    : mieAyamBakso
                }
              />
            )}
            {menu.jenis === "Cemilan" && (
              <Card.Img
                variant="top"
                src={
                  menu.gambar === "pangsit.jpg"
                    ? pangsit
                    : menu.gambar === "kentang-goreng.jpg"
                    ? kentangGoreng
                    : cheeseBurger
                }
              />
            )}
            {menu.jenis === "Minuman" && (
              <Card.Img
                variant="top"
                src={
                  menu.gambar === "cheese-burger.jpg"
                    ? cheeseBurger
                    : menu.gambar === "coffe-late.jpg"
                    ? coffeLate
                    : menu.gambar === "es-jeruk.jpg"
                    ? esJeruk
                    : tehHangat
                }
              />
            )}

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
