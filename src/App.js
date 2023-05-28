import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import EditMenu from "./pages/edit/DaftarMenuEdit";
import EditDetails from "./pages/EditDetail/editDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import TambahMenu from "./pages/TambahMenu/TambahMenu";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit-menu" element={<EditMenu />} />
        <Route path="/edit-menu/:id" element={<EditDetails />} />
        <Route path="/tambah-menu" element={<TambahMenu />} />
      </Routes>
    </Router>
  );
};

export default App;
