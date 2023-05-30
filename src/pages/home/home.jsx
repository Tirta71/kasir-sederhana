import React, { useState } from "react";
import NavbarKu from "../../component/navbar/navbar";
import MenuUtama from "../../component/menu/Menu";
import SideNav from "../../component/sideNav/sideNav";
import "./home.css";
import Keranjang from "../../component/Keranjang/Keranjang";
import swal from "sweetalert";
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [keranjang, setKeranjang] = useState([]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const updateJumlahItem = (item, jumlahBaru) => {
    // Perbarui jumlah item dalam keranjang
    const updatedKeranjang = keranjang.map((keranjangItem) =>
      keranjangItem.id === item.id
        ? { ...keranjangItem, jumlah: jumlahBaru }
        : keranjangItem
    );

    setKeranjang(updatedKeranjang);
  };

  const hapusItem = (itemId) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const updatedKeranjang = keranjang.filter((item) => item.id !== itemId);
        setKeranjang(updatedKeranjang);
        swal("Item Berhasil Di hapus", {
          icon: "success",
        });
      } else {
        swal("Item mu tetep ada kok");
      }
    });
  };

  return (
    <div>
      <NavbarKu active={true} />
      <div>
        <div className="container-home">
          <div className="left-page mx-5 mt-2">
            <h2 className="list-menu-text">List Menu</h2>
            <h1 className="daftar-menu-text">Daftar Menu</h1>
            <SideNav
              activeCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
            <div className="mt-5">
              <Keranjang
                keranjang={keranjang}
                updateJumlahItem={updateJumlahItem}
                hapusItem={hapusItem}
                setKeranjang={setKeranjang}
              />
            </div>
          </div>
          <div className="center-page">
            <h1 className="text-center">Daftar Menu</h1>
            <MenuUtama
              selectedCategory={selectedCategory}
              setKeranjang={setKeranjang}
              keranjang={keranjang}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
