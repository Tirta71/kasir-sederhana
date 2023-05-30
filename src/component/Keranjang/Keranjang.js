import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./Keranjang.css";
import swal from "sweetalert";
import { NomorMeja } from "../nomorMeja/nomorMeja";
import { ItemKeranjang } from "../itemKeranjang/itemKeranjang";
import jsPDF from "jspdf";

const Keranjang = ({ keranjang, updateJumlahItem, setKeranjang }) => {
  const [tambahKeterangan, setTambahKeterangan] = useState(false);
  const [keterangan, setKeterangan] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [nomorMeja, setNomorMeja] = useState("");
  const [dataMeja, setDataMeja] = useState({});
  const printRef = useRef(null);

  const kurangiJumlahItem = (item) => {
    if (item.jumlah > 1) {
      updateJumlahItem(item, item.jumlah - 1);
    }
  };

  const tambahJumlahItem = (item) => {
    updateJumlahItem(item, item.jumlah + 1);
  };

  const handleTambahKeterangan = (itemId) => {
    setSelectedItemId(itemId);
    setTambahKeterangan(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitKeterangan = (event) => {
    event.preventDefault();

    const selectedMenu = keranjang.find((item) => item.id === selectedItemId);

    if (selectedMenu) {
      selectedMenu.keterangan = keterangan;
    }
    setKeterangan("");
    setTambahKeterangan(false);
    setShowModal(false);

    swal("Keterangan berhasil diperbarui");
  };

  const handleTambahMeja = () => {
    if (nomorMeja && keranjang.length > 0) {
      const dataMejaCopy = { ...dataMeja };
      dataMejaCopy[nomorMeja] = keranjang;
      setDataMeja(dataMejaCopy);
      setKeranjang([]);
      setNomorMeja("");
      swal("Success!", "Nomor meja berhasil ditambahkan", "success");
    } else {
      swal("Error", "Nomor meja atau keranjang kosong", "error");
    }
  };

  const handlePilihMeja = (nomorMeja) => {
    setKeranjang(dataMeja[nomorMeja] || []);
    setNomorMeja(nomorMeja);
  };

  const hapusItem = (itemId) => {
    swal({
      title: "Apakah kamu yakin?",
      text: "Item akan dihapus dari keranjang",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const updatedKeranjang = keranjang.filter((item) => item.id !== itemId);
        setKeranjang(updatedKeranjang);
        swal("Item berhasil dihapus", {
          icon: "success",
        });

        const updatedDataMeja = {};
        Object.keys(dataMeja).forEach((nomorMeja) => {
          const updatedKeranjangMeja = dataMeja[nomorMeja].filter(
            (item) => item.id !== itemId
          );
          if (updatedKeranjangMeja.length > 0) {
            updatedDataMeja[nomorMeja] = updatedKeranjangMeja;
          }
        });
        setDataMeja(updatedDataMeja);
      } else {
        swal("Item tetap ada dalam keranjang");
      }
    });
  };

  const hapusSemuaItem = () => {
    swal({
      title: "Apakah kamu yakin?",
      text: "Semua item akan dihapus dari keranjang",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setKeranjang([]);
        if (nomorMeja) {
          const updatedDataMeja = { ...dataMeja };
          delete updatedDataMeja[nomorMeja];
          setDataMeja(updatedDataMeja);
        }
        swal("Semua item berhasil dihapus", {
          icon: "success",
        });
      } else {
        swal("Item tetap ada dalam keranjang");
      }
    });
  };

  const handleBayar = () => {
    if (nomorMeja && keranjang.length > 0) {
      if (dataMeja[nomorMeja]) {
        // Calculate total harga
        const totalHarga = keranjang.reduce(
          (total, item) => total + item.harga * item.jumlah,
          0
        );

        // Generate PDF
        const pdf = new jsPDF();
        const startY = 10;
        const lineHeight = 10;

        // Add content to the PDF
        pdf.setFontSize(16);
        pdf.text("Struk Pembayaran", 10, startY);
        pdf.setFontSize(12);
        let currentY = startY + lineHeight;
        keranjang.forEach((item) => {
          const lineText = `${item.nama} x ${item.jumlah} - Rp.${
            item.harga * item.jumlah
          }`;
          pdf.text(lineText, 10, currentY);
          currentY += lineHeight;
        });

        // Add total harga to the PDF
        const totalHargaText = `Total Harga: Rp.${totalHarga}`;
        pdf.setFontSize(14);
        pdf.text(totalHargaText, 10, currentY + lineHeight);

        pdf.save("struk_pembayaran.pdf");

        setKeranjang([]);
        setDataMeja((prevDataMeja) => {
          const updatedDataMeja = { ...prevDataMeja };
          delete updatedDataMeja[nomorMeja];
          return updatedDataMeja;
        });

        swal("Pembayaran berhasil", "Terima kasih!", "success");
      } else {
        swal("Error", "Nomor meja tidak valid", "error");
      }
    } else {
      swal("Error", "Nomor meja atau keranjang kosong", "error");
    }
  };

  return (
    <div className="keranjang-container">
      <h1 className="keranjang-title">Keranjang</h1>

      <NomorMeja
        dataMeja={dataMeja}
        nomorMeja={nomorMeja}
        handlePilihMeja={handlePilihMeja}
      />

      {keranjang.length === 0 ? (
        <p className="keranjang-empty">Keranjang kosong.</p>
      ) : (
        <ul className="keranjang-list">
          {keranjang.map((item) => (
            <ItemKeranjang
              key={item.id}
              item={item}
              kurangiJumlahItem={kurangiJumlahItem}
              tambahJumlahItem={tambahJumlahItem}
              hapusItem={hapusItem}
              handleTambahKeterangan={handleTambahKeterangan}
            />
          ))}
          <div className="bayar" ref={printRef}>
            {keranjang.length === 0 ? null : (
              <div className="mt-2 mb-2">
                <input
                  type="text"
                  placeholder="Masukkan nomor Meja"
                  className="form-control"
                  value={nomorMeja || ""}
                  onChange={(event) => setNomorMeja(event.target.value)}
                />
              </div>
            )}
            <button className="btn-tambah-meja" onClick={handleTambahMeja}>
              Tambah Meja
            </button>
            {keranjang.length > 0 && (
              <button className="btn-hapus-semua" onClick={hapusSemuaItem}>
                Hapus Semua Item
              </button>
            )}

            <span className="keranjang-total-harga fw-bold">
              Total Harga : Rp.
              {keranjang.reduce(
                (total, item) => total + item.harga * item.jumlah,
                0
              )}
            </span>
            {nomorMeja && keranjang.length > 0 && (
              <button className="btn-bayar" onClick={handleBayar}>
                Bayar Meja {nomorMeja}
              </button>
            )}
          </div>
        </ul>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Keterangan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitKeterangan}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Tambahkan Keterangan</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Contoh : Tidak Pedas"
                value={keterangan}
                onChange={(event) => setKeterangan(event.target.value)}
              />
            </Form.Group>
            <div className="modal-buttons">
              <Button variant="secondary" onClick={handleCloseModal}>
                Batal
              </Button>
              <Button variant="primary" type="submit">
                Simpan
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Keranjang;
