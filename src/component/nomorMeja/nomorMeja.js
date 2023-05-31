export const NomorMeja = ({
  dataMeja,
  nomorMeja,
  handlePilihMeja,
  handleCloseMeja,
}) => {
  const isEmpty = Object.keys(dataMeja).length === 0;

  return (
    <div className="nomor-meja-container">
      {!isEmpty && (
        <div>
          <button
            className="close-meja-button btn btn-primary mb-2 w-100"
            onClick={handleCloseMeja}
          >
            Tambah Meja
          </button>
          <span>Pilih Meja:</span>
        </div>
      )}
      <div className="nomor-meja-list">
        {Object.keys(dataMeja).map((nomor) => (
          <button
            key={nomor}
            className={`nomor-meja-button ${
              nomor === nomorMeja ? "active" : ""
            }`}
            onClick={() => handlePilihMeja(nomor)}
          >
            Meja {nomor}
          </button>
        ))}
      </div>
    </div>
  );
};
