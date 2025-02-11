import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid2, Typography } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleVote = () => {
    navigate("/vote");
  };

  const handleAdminLogin = () => {
    user ? logout() : navigate("/login");
  };

  return (
    <Grid2 className="home-container">
      <Typography variant="h1" className="title">
        Bienvenido al Sistema de Votación
      </Typography>
      {user && (
        <Typography variant="body1" className="subtitle">
          Estás logueado con tu cuenta de Admin
        </Typography>
      )}
      <Grid2 className="button-container">
        <Typography className="subtitle">¿Qué deseas hacer?</Typography>
        <Button className="button" onClick={handleVote}>
          Votar
        </Button>
        {user && (
          <Button className="button" onClick={() => navigate("/admin")}>
            Ir a gestión
          </Button>
        )}
        {user ? (
          <Button className="button" onClick={handleAdminLogin}>
            Cerrar sesión
          </Button>
        ) : (
          <Button className="button" onClick={handleAdminLogin}>
            Ingresar como Admin
          </Button>
        )}
      </Grid2>
    </Grid2>
  );
};

export default Home;
