import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import authAPI from "../../api/authAPI";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import "./auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await authAPI.login(email, password);
      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError("Email o contraseña incorrectos");
    }
  };

  return (
    <Grid2 className="login-container">
      <Typography variant="h1" className="title">
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleLogin} className="form">
        <InputLabel className="label">Email:</InputLabel>
        <TextField
          type="email"
          variant="outlined"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          slotProps={{
            input: { style: { color: "whitesmoke" } },
          }}
        />
        <InputLabel className="label">Contraseña:</InputLabel>
        <TextField
          type="password"
          variant="outlined"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          slotProps={{
            input: {
              style: { color: "whitesmoke" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? (
                      <VisibilityOff sx={{ color: "whitesmoke" }} />
                    ) : (
                      <Visibility sx={{ color: "whitesmoke" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Button type="submit" className="button">
          Iniciar Sesión
        </Button>
      </form>
      {error && (
        <Alert
          severity="error"
          sx={{
            marginTop: "10px",
            width: { xs: "80%", md: "60%" },
            fontFamily: "Poppins",
          }}
        >
          {error}
        </Alert>
      )}
    </Grid2>
  );
};

export default Login;
