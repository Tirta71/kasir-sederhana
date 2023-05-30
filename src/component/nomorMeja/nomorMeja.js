export const NomorMeja = ({ dataMeja, nomorMeja, handlePilihMeja }) => {
  const isEmpty = Object.keys(dataMeja).length === 0;

  return (
    <div className="nomor-meja-container">
      {!isEmpty && (
        <div>
          <span>Pilih Meja:</span>
          <button
            className="close-meja-button btn btn-primary mb-2 w-100"
            onClick={() => handlePilihMeja()}
          >
            Tutup
          </button>
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
