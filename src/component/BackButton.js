import React from "react";
import { Button } from "react-bootstrap";

const BackButton = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Button variant="primary" onClick={handleGoBack}>
      Kembali
    </Button>
  );
};

export default BackButton;
