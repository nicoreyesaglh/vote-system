import React from "react";
import Navbar from "../components/Admin/Navbar";
import { Route, Routes } from "react-router-dom";
import Votes from "../components/Admin/Votes/Votes";
import MostVoted from "../components/Admin/MostVoted/MostVoted";
import AddVoter from "../components/Admin/AddVoter/AddVoter";
import ChangePassword from "../components/Auth/ChangePassword";

const AdminPage = () => {
  const pages = [
    { label: "Candidatos más votados", url: "/admin/most-voted" },
    { label: "Votos", url: "/admin/votes" },
    { label: "Agregar votante", url: "/admin/create-voter" },
  ];

  const settings = [
    { label: "Cambiar contraseña", url: "/admin/modify-password" },
    { label: "Cerrar sesión", url: "logout" },
  ];
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar pages={pages} settings={settings} />

      <Routes>
        <Route index element={<Votes />} />
        <Route path="votes" element={<Votes />} />
        <Route path="most-voted" element={<MostVoted />} />
        <Route path="create-voter" element={<AddVoter />} />
        <Route path="modify-password" element={<ChangePassword />} />
      </Routes>
    </div>
  );
};

export default AdminPage;
