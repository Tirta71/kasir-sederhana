import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./Keranjang.css";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { NomorMeja } from "../nomorMeja/nomorMeja";
import { ItemKeranjang } from "../itemKeranjang/itemKeranjang";

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
      const existingItemIndex = keranjang.findIndex(
        (item) => item.id === selectedItemId
      );

      if (existingItemIndex !== -1) {
        // If the item already exists, update the quantity
        const updatedKeranjang = [...keranjang];
        updatedKeranjang[existingItemIndex].jumlah += 1;

        setKeranjang(updatedKeranjang);
        setNomorMeja("");
        swal("Success!", "Data meja berhasil diperbarui", "success");
      } else {
        const postData = {
          nomorMeja,
          keranjang: [...keranjang],
        };

        const apiUrl = "https://646f8bf209ff19b120877364.mockapi.io/login/meja";

        // Check if the meja entry already exists
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            const existingEntry = data.find(
              (entry) => entry.nomorMeja === nomorMeja
            );

            if (existingEntry) {
              const updatedKeranjang = [
                ...existingEntry.keranjang,
                ...keranjang,
              ];

              // If the entry exists, update it using a PUT request
              fetch(`${apiUrl}/${existingEntry.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...existingEntry,
                  keranjang: updatedKeranjang,
                }),
              })
                .then((response) => {
                  if (response.ok) {
                    setKeranjang([]);
                    setNomorMeja("");
                    swal(
                      "Success!",
                      "Data meja berhasil diperbarui",
                      "success"
                    );
                  } else {
                    throw new Error("Error updating meja");
                  }
                })
                .catch((error) => {
                  swal("Error", "Gagal memperbarui data meja", "error");
                  console.error("Error updating meja:", error);
                });
            } else {
              // If the entry doesn't exist, create a new one using a POST request
              fetch(apiUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
              })
                .then((response) => {
                  if (response.ok) {
                    setKeranjang([]);
                    setNomorMeja("");
                    swal(
                      "Success!",
                      "Silahkan Ditunggu Pesanan nya",
                      "success"
                    );
                  } else {
                    throw new Error("Error adding meja");
                  }
                })
                .catch((error) => {
                  swal("Error", "Gagal menambahkan meja", "error");
                  console.error("Error adding meja:", error);
                });
            }
          })
          .catch((error) => {
            swal("Error", "Gagal mengambil data meja", "error");
            console.error("Error fetching meja data:", error);
          });
      }
    } else {
      swal("Error", "Nomor meja atau keranjang kosong", "error");
    }
  };

  const handlePilihMeja = (selectedNomorMeja) => {
    if (selectedNomorMeja === nomorMeja) {
      setKeranjang([]);
      setNomorMeja("");
    } else {
      setKeranjang(dataMeja[selectedNomorMeja] || []);
      setNomorMeja(selectedNomorMeja);
    }
  };

  const handleCloseMeja = () => {
    Swal.fire("Tambah Meja?", "Langsung Pilih menu nya saja yaa", "warning");
    setKeranjang([]);
    setNomorMeja("");
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

  return (
    <div className="keranjang-container   ">
      <h1 className="keranjang-title">Keranjang</h1>

      <NomorMeja
        dataMeja={dataMeja}
        nomorMeja={nomorMeja}
        handlePilihMeja={handlePilihMeja}
        handleCloseMeja={handleCloseMeja}
      />

      {keranjang.length === 0 ? (
        <p className="keranjang-empty">
          Keranjang kosong.
          <span style={{ display: "block" }}>
            Jika mau merubah pesanan samakan nomor meja nya saja
          </span>
        </p>
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
                <span className="fw-bold d-flex justify-content-center mb-2 fs-5">
                  Meja Nomor
                </span>
                <input
                  type="text"
                  placeholder="Masukkan nomor Meja"
                  className="form-control text-center  fw-bold"
                  value={nomorMeja}
                  onChange={(event) => setNomorMeja(event.target.value)}
                />
              </div>
            )}
            <button className="btn-tambah-meja" onClick={handleTambahMeja}>
              Update
            </button>

            <span className="keranjang-total-harga fw-bold">
              Total Harga : Rp.
              {keranjang.reduce(
                (total, item) => total + item.harga * item.jumlah,
                0
              )}
            </span>
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
