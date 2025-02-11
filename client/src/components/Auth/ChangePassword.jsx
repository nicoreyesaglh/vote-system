import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import authAPI from "../../api/authAPI";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Button, Grid2, IconButton, InputAdornment, InputLabel, TextField, Typography } from "@mui/material";
import './auth.css';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);
    const [error, setError] = useState("");
    const [confirm, setConfirm] = useState("");
  const { user } = useContext(AuthContext);

    const togglePasswordVisibility = (v) => {
        v === 1 ?
            setShowPassword(!showPassword)
            : v === 2 ?
                setShowNewPassword(!showNewPassword)
                :
                setShowNewPasswordConfirm(!showNewPasswordConfirm);
  };

  const handleChangePass = async (e) => {
    e.preventDefault();
      setError("");
      setConfirm("");

      if (newPassword !== newPasswordConfirm) {
          setError("Las contraseñas nuevas no coinciden");
          return;
      }

      if (password === newPassword) {
        setError("La contraseña nueva no puede ser igual a la actual");
        return;
    }

    try {
        const data = await authAPI.modifyPassword(user.email, password, newPassword);
        if (data.error) {
            setError(data.error);
            return;
        }
        setConfirm(data.message)
        cleanStates();
        
    } catch (err) {
        setError(err.error);
    }
};
    
    const cleanStates = () => {
        setPassword("");
        setNewPassword("");
        setNewPasswordConfirm("");
    }

  return (
    <Grid2 className='pass-container'>
      <Typography variant="h1" className="title">Cambio de contraseña</Typography>
      <Typography variant="body1" className="subtitle">Para cambiar de contraseña ingresa primero tu contraseña actual. Luego ingresa la nueva contraseña en los dos campos siguientes.</Typography>
      <form onSubmit={handleChangePass} className="form">
          
          <InputLabel className='label'>Contraseña actual:</InputLabel>
          <TextField
            type={showPassword ? "text" : "password"}
            variant='outlined'
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            slotProps={{
                input: {
                    style: { color: 'whitesmoke' },
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton onClick={() => togglePasswordVisibility(1)} edge="end">
                                {showPassword ? <VisibilityOff sx={{ color: "whitesmoke" }} /> : <Visibility  sx={{ color: "whitesmoke" }}/>}
                        </IconButton>
                        </InputAdornment>
                    ),
                },
                 }}
              />
        <InputLabel className='label'>Contraseña nueva:</InputLabel>
          <TextField
             type={showNewPassword ? "text" : "password"}
            variant='outlined'
            className="input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            slotProps={{
                input: {
                    style: { color: 'whitesmoke' },
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton onClick={() => togglePasswordVisibility(2)} edge="end">
                            {showNewPassword ? <VisibilityOff sx={{ color: "whitesmoke" }}/> : <Visibility sx={{ color: "whitesmoke" }}/>}
                        </IconButton>
                        </InputAdornment>
                    ),
                },
               
                 }} />
        <InputLabel className='label'>Confirma la nueva contraseña:</InputLabel>
          <TextField
           type={showNewPasswordConfirm ? "text" : "password"}
            variant='outlined'
            className="input"
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            required
            slotProps={{
                input: {
                    style: { color: 'whitesmoke' },
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton onClick={() => togglePasswordVisibility(3)} edge="end">
                            {showNewPasswordConfirm ? <VisibilityOff sx={{ color: "whitesmoke" }}/> : <Visibility sx={{ color: "whitesmoke" }}/>}
                        </IconButton>
                        </InputAdornment>
                    ),
                },
               
                 }}/>
        <Button type="submit" className="button">Cambiar contraseña</Button>
      </form>
      {error && <Alert severity="error" sx={{marginTop:'10px', width:'60%', fontFamily:'Poppins'}}>{error}</Alert>}
      {confirm && <Alert severity="success" sx={{marginTop:'10px', width:'60%'}}>{confirm}</Alert>}
        
      </Grid2>
  );
};

export default ChangePassword;