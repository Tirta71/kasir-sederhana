import React, { useEffect, useState } from "react";
import NavbarKu from "../../component/navbar/navbar";
import axios from "axios";
import { Card } from "react-bootstrap";
import "./meja.css";
import { jsPDF } from "jspdf";
import Swal from "sweetalert2";
export default function Meja() {
  const [mejaList, setMejaList] = useState([]);
  const [selectedMeja, setSelectedMeja] = useState(null);
  const [editJumlah, setEditJumlah] = useState({});

  useEffect(() => {
    fetchMejaData();
  }, []);

  const fetchMejaData = async () => {
    try {
      const response = await axios.get(
        "https://646f8bf209ff19b120877364.mockapi.io/login/meja"
      );
      setMejaList(response.data);
    } catch (error) {
      console.error("Error fetching meja data:", error);
    }
  };

  const handleMejaClick = (meja) => {
    if (selectedMeja && selectedMeja.id === meja.id) {
      setSelectedMeja(null);
    } else {
      setSelectedMeja(meja);
    }
    setEditJumlah({});
  };

  const handleEditJumlah = (itemId, event) => {
    setEditJumlah((prevEditJumlah) => ({
      ...prevEditJumlah,
      [itemId]: event.target.value,
    }));
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const updatedMenu = selectedMeja.keranjang.filter(
        (item) => item.id !== itemId
      );

      const updatedMeja = { ...selectedMeja, keranjang: updatedMenu };

      await axios.put(
        `https://646f8bf209ff19b120877364.mockapi.io/login/meja/${selectedMeja.id}`,
        updatedMeja
      );

      fetchMejaData();
      setEditJumlah({});
      Swal.fire(
        "Makanan Terhapus Dari daftar",
        "Jika Tidak Terhapus Coba refresh",
        "success"
      );
    } catch (error) {
      console.error("Error removing menu item:", error);
    }
  };

  const handleRemoveMeja = async () => {
    const confirmation = await Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Nomor meja akan di hapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    if (confirmation.isConfirmed) {
      try {
        await axios.delete(
          `https://646f8bf209ff19b120877364.mockapi.io/login/meja/${selectedMeja.id}`
        );

        fetchMejaData();
        setSelectedMeja(null);
        setEditJumlah({});

        Swal.fire("Nomor Meja Berhasil Terhapus", "", "success");
      } catch (error) {
        console.error("Error Menghapus meja:", error);
        Swal.fire("Error", "gagal untuk menghapus meja", "error");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedMeja || Object.keys(editJumlah).length === 0) {
      return;
    }

    try {
      const updatedMenu = selectedMeja.keranjang.map((item) => {
        const updatedJumlah = editJumlah[item.id]
          ? parseInt(editJumlah[item.id])
          : item.jumlah;
        return { ...item, jumlah: updatedJumlah };
      });

      const updatedMeja = { ...selectedMeja, keranjang: updatedMenu };

      await axios.put(
        `https://646f8bf209ff19b120877364.mockapi.io/login/meja/${selectedMeja.id}`,
        updatedMeja
      );

      fetchMejaData();
      setEditJumlah({});
      Swal.fire(
        "Data Terupdate",
        "Pastikan Tidak mengosonkan input nya",
        "success"
      );
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  const handleBayar = async () => {
    if (!selectedMeja) {
      return;
    }

    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Bayar!",
    });

    if (confirmation.isConfirmed) {
      try {
        await axios.delete(
          `https://646f8bf209ff19b120877364.mockapi.io/login/meja/${selectedMeja.id}`
        );

        fetchMejaData();
        setSelectedMeja(null);
        setEditJumlah({});

        const doc = new jsPDF();
        doc.text("Daftar Pesanan", 10, 10);

        let yPos = 30;
        selectedMeja.keranjang.forEach((item, index) => {
          const subtotal = item.jumlah * item.harga;
          doc.text(
            `${index + 1}. ${item.nama} (Jumlah: ${
              item.jumlah
            }) - Rp${subtotal}`,
            10,
            yPos
          );
          yPos += 10;
        });

        doc.text(
          `Total: Rp${calculateTotal(selectedMeja.keranjang)}`,
          10,
          yPos + 10
        );

        doc.save(`nota_meja_${selectedMeja.nomorMeja}.pdf`);

        Swal.fire(
          "Berhasil",
          "Nomor Meja telah dihapus dan nota telah tercetak",
          "success"
        );
      } catch (error) {
        console.error("Error removing meja and generating PDF:", error);
        Swal.fire("Error", "Failed to remove meja and generate PDF", "error");
      }
    }
  };

  const calculateTotal = (menuItems) => {
    let total = 0;
    menuItems.forEach((item) => {
      total += item.jumlah * item.harga;
    });
    return total;
  };

  return (
    <div>
      <NavbarKu />

      <div className="meja-container container">
        <h1 className="text-center">Daftar Table</h1>
        {mejaList.map((meja) => (
          <div
            key={meja.id}
            className={`meja-item ${
              selectedMeja && selectedMeja.id === meja.id ? "active" : ""
            }`}
          >
            <div className="button-meja">
              <button onClick={() => handleMejaClick(meja)}>
                Meja: {meja.nomorMeja}
              </button>
            </div>
            {selectedMeja && selectedMeja.id === meja.id && (
              <form onSubmit={handleSubmit}>
                <p className="text-danger mt-5 fw-bold fs-5">
                  note: isi semua edit jumlah agar tidak mengalami error{" "}
                </p>
                <div className="container-card">
                  {meja.keranjang.map((item) => (
                    <Card
                      key={item.id}
                      style={{
                        width: "250px",
                        height: "300px",
                        overflow: "hidden",
                      }}
                      className="m-2 myCard shadow "
                    >
                      <Card.Img
                        variant="top"
                        src={item.gambar}
                        style={{ objectFit: "cover", height: "100px" }}
                      />
                      <Card.Body>
                        <Card.Title>{item.nama}</Card.Title>
                        <Card.Text>Jumlah : {item.jumlah}</Card.Text>

                        <input
                          type="number"
                          value={editJumlah[item.id] || ""}
                          onChange={(event) => handleEditJumlah(item.id, event)}
                          className="form-control"
                          placeholder="Edit Jumlah"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="btn btn-danger mt-2 w-100"
                        >
                          Hapus Makanan
                        </button>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
                <div className="button-meja-bottom">
                  <button type="submit" className="btn-update">
                    Update
                  </button>
                  {selectedMeja && selectedMeja.id === meja.id && (
                    <>
                      <button onClick={handleBayar} className="btn-bayar">
                        Bayar
                      </button>
                      <button
                        onClick={handleRemoveMeja}
                        className="btn-hapus-meja"
                      >
                        Hapus Meja {meja.nomorMeja}
                      </button>
                    </>
                  )}
                </div>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
