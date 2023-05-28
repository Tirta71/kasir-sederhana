import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import BackButton from "../../component/BackButton";

export default function TambahMenu() {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [jenis, setJenis] = useState("");
  const [gambar, setGambar] = useState("");

  const handleTambahMenu = () => {
    if (!nama || !harga || !jenis || !gambar) {
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
      gambar: gambar,
    };

    axios
      .post("https://646f8bf209ff19b120877364.mockapi.io/login/menus", newMenu)
      .then((response) => {
        console.log("Menu berhasil ditambahkan:", response.data);
        setNama("");
        setHarga("");
        setJenis("");
        setGambar("");
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

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setGambar(file.name);
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
        <Form.Group controlId="formGambar">
          <Form.Label>Gambar</Form.Label>
          <Form.Control type="file" onChange={handleUpload} />
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
        note : untuk Gambar masih belum bisa ora punya backend bouss
      </p>
    </div>
  );
}
