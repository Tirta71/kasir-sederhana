import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./Keranjang.css";
import swal from "sweetalert";
import { jsPDF } from "jspdf";

const Keranjang = ({
  keranjang,
  updateJumlahItem,
  hapusItem,
  setKeranjang,
}) => {
  const [tambahKeterangan, setTambahKeterangan] = useState(false);
  const [keterangan, setKeterangan] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
  const handleBayar = () => {
    const doc = new jsPDF();
    let yPos = 20;

    doc.setFontSize(16);
    doc.text("Struk Pembayaran", 10, yPos);

    yPos += 10;

    keranjang.forEach((item) => {
      const subtotal = item.harga * item.jumlah;
      doc.setFontSize(12);
      doc.text(`${item.nama}    Harga: Rp. ${item.harga}`, 10, yPos);
      doc.text(`x ${item.jumlah}`, 10, yPos + 5);
      doc.text(`Subtotal: Rp. ${subtotal}`, 80, yPos);
      yPos += 15;
    });

    const totalHarga = keranjang.reduce(
      (total, item) => total + item.harga * item.jumlah,
      0
    );
    yPos += 10;
    doc.setFontSize(14);
    doc.text(`Total Harga: Rp. ${totalHarga}`, 10, yPos);

    doc.save("struk_pembayaran.pdf");

    setKeranjang([]);
    swal("Success!", "Pembayaran Berhasil", "success");
  };

  return (
    <div className="keranjang-container">
      <h1 className="keranjang-title">Keranjang</h1>
      {keranjang.length === 0 ? (
        <p className="keranjang-empty">Keranjang kosong.</p>
      ) : (
        <ul className="keranjang-list">
          {keranjang.map((item) => (
            <li key={item.id} className="keranjang-item">
              <div className="item-details">
                <div className="item-info">
                  <span className="keranjang-nama">{item.nama}</span>
                  <span className="keranjang-harga">
                    Harga: {item.harga * item.jumlah}
                  </span>
                </div>
                <div className="item-actions">
                  <button
                    className="jumlah-button"
                    onClick={() => kurangiJumlahItem(item)}
                  >
                    -
                  </button>
                  <span className="keranjang-jumlah">{item.jumlah}</span>
                  <button
                    className="jumlah-button"
                    onClick={() => tambahJumlahItem(item)}
                  >
                    +
                  </button>
                </div>
              </div>

              {item.keterangan && (
                <p className="keranjang-keterangan">
                  Keterangan: {item.keterangan}
                </p>
              )}

              <button className="delete-all" onClick={() => hapusItem(item.id)}>
                Hapus Semua
              </button>

              <button
                className="btn-tambah-keterangan"
                onClick={() => handleTambahKeterangan(item.id)}
              >
                Tambah Keterangan
              </button>
            </li>
          ))}
          <div className="bayar">
            <span className="keranjang-total-harga">
              Total Harga : Rp.
              {keranjang.reduce(
                (total, item) => total + item.harga * item.jumlah,
                0
              )}
            </span>
            <button className="btn-bayar" onClick={() => handleBayar()}>
              Bayar Sekarang
            </button>
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
