import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import authAPI from "../../api/authAPI";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Grid2, InputLabel, TextField, Typography } from "@mui/material";
import './auth.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const data = await authAPI.login(email, password);
        login(data.user, data.token);
        navigate("/admin"); 
    } catch (err) {
        setError("Email o contraseña incorrectos");
    }
};
  return (
    <Grid2 className='login-container'>
      <Typography variant="h1" className="title">Iniciar Sesión</Typography>
      <form onSubmit={handleLogin} className="form">
          <InputLabel className='label'>Email:</InputLabel>
          <TextField
            type="email"
            variant='outlined'
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            slotProps={{
              input: {style:{ color: 'whitesmoke'}}
            }}
          />
          <InputLabel className='label'>Contraseña:</InputLabel>
          <TextField
            type="password"
            variant='outlined'
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            slotProps={{
              input: {style:{ color: 'whitesmoke'}}
            }}/>
        <Button type="submit" className="button">Iniciar Sesión</Button>
      </form>
      {error && <Alert severity="error" sx={{marginTop:'10px', width:'60%', fontFamily:'Poppins'}}>{error}</Alert>}
    </Grid2>
  );
};

export default Login;