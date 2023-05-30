import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import BackButton from "../../component/BackButton";

export default function TambahMenu() {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [jenis, setJenis] = useState("");
  const [gambarURL, setGambarURL] = useState(""); // Ubah variabel gambar menjadi gambarURL

  const handleTambahMenu = () => {
    if (!nama || !harga || !jenis || !gambarURL) {
      swal("Error", "Harap lengkapi semua input", "error");
      return;
    }

    if (isNaN(harga)) {
      swal("Error", "Harga harus berupa angka", "error");
      return;
    }

    const newMenu = {
      nama: nama,
      harga: harga,
      jenis: jenis,
      gambar: gambarURL, // Ubah nilai gambar menjadi gambarURL
    };

    axios
      .post("https://646f8bf209ff19b120877364.mockapi.io/login/menus", newMenu)
      .then((response) => {
        console.log("Menu berhasil ditambahkan:", response.data);
        setNama("");
        setHarga("");
        setJenis("");
        setGambarURL(""); // Reset nilai gambarURL menjadi string kosong
        swal({
          title: "Berhasil",
          text: "Berhasil Menambahkan Item",
          icon: "success",
        });
        setTimeout(function () {
          window.location.href = "/edit-menu";
        }, 2000);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan dalam menambahkan menu:", error);
      });
  };

  return (
    <div className="container">
      <h1 className="text-center">Tambah Menu</h1>
      <Form>
        <Form.Group controlId="formNama">
          <Form.Label>Nama Makanan</Form.Label>
          <Form.Control
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formHarga">
          <Form.Label>Harga</Form.Label>
          <Form.Control
            type="text"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formJenis">
          <Form.Label>Jenis</Form.Label>
          <Form.Control
            as="select"
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
          >
            <option value="">Pilih Jenis</option>
            <option value="Makanan">Makanan</option>
            <option value="Cemilan">Cemilan</option>
            <option value="Minuman">Minuman</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formGambarURL">
          {" "}
          {/* Ubah controlId menjadi formGambarURL */}
          <Form.Label>Gambar URL</Form.Label>{" "}
          {/* Ubah label menjadi Gambar URL */}
          <Form.Control
            type="text"
            value={gambarURL}
            onChange={(e) => setGambarURL(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleTambahMenu}
          className="mt-4 mb-4"
          style={{ width: "100%" }}
        >
          Tambah
        </Button>
        <BackButton />
      </Form>
      <p className="text-danger mt-3">
        note : untuk Gambar copy url link dari mana saja yang penting berbentuk
        url
      </p>
    </div>
  );
}
