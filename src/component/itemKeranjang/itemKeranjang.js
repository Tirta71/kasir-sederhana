export const ItemKeranjang = ({
  item,
  kurangiJumlahItem,
  tambahJumlahItem,
  hapusItem,
  handleTambahKeterangan,
}) => {
  return (
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
        <p className="keranjang-keterangan">Keterangan: {item.keterangan}</p>
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
  );
};
