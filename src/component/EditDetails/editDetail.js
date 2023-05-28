import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BackButton from "../BackButton";

export default function EditDetail({ id }) {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");

  const handleEditDetail = () => {
    const updatedDetail = {
      nama: nama,
      harga: harga,
    };

    Swal.fire({
      title: "Apakah Anda ingin menyimpan perubahan?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      denyButtonText: `Jangan simpan`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `https://646f8bf209ff19b120877364.mockapi.io/login/menus/${id}`,
            updatedDetail
          )
          .then((response) => {
            console.log("Detail berhasil diperbarui:", response.data);
            Swal.fire("Sukses", "Detail berhasil diperbarui", "success");
            setTimeout(() => {
              window.location.href = "/edit-menu";
            }, 2000);
          })
          .catch((error) => {
            console.error(error);
            Swal.fire(
              "Error",
              "Terjadi kesalahan dalam memperbarui detail",
              "error"
            );
          });
      } else if (result.isDenied) {
        Swal.fire("Perubahan tidak disimpan", "", "info");
      }
    });
  };

  const handleNamaChange = (e) => {
    setNama(e.target.value);
  };

  const handleHargaChange = (e) => {
    setHarga(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="text-center">Edit Detail</h1>
      <form>
        <div className="mb-3">
          <label className="form-label">Nama:</label>
          <input
            type="text"
            className="form-control"
            value={nama}
            onChange={handleNamaChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Harga:</label>
          <input
            type="text"
            className="form-control"
            value={harga}
            onChange={handleHargaChange}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary mb-4"
          onClick={handleEditDetail}
          style={{ width: "100%" }}
        >
          Simpan
        </button>
        <BackButton />
      </form>
      <p className="text-danger mt-3">
        note : untuk Gambar masih belum bisa ora punya backend bouss
      </p>
    </div>
  );
}
