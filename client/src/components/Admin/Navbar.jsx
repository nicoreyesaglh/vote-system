import { useContext, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./admin.css";

function Navbar({ pages, settings }) {
  const { logout } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            href="/"
            component="a"
            sx={{
              display: { xs: "none", md: "flex" },
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Sistema de Votación
          </Typography>

          <Box sx={{ display: { xs: "flex", md: "none" }, width: "20px" }}>
            <IconButton
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              className="mobile-menu"
              sx={{
                display: { xs: "flex", md: "none" },
                backgroundColor: "transparent",
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={() => navigate(page.url)}>
                  <Typography>{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "flex", md: "none" },
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Sistema de Votación
          </Typography>
          <Box
            sx={{
              width: "70%",
              height: "60px",
              display: { xs: "none", md: "flex" },
              gap: "20px",
              justifyContent: "flex-start",
              paddingLeft: "60px",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => navigate(page.url)}
                style={{
                  color: "white",
                  display: "block",
                  fontWeight: "bold",
                  width: "20%",
                  borderRadius: "0px",
                  borderBottom:
                    location.pathname === page.url ? "2px solid white" : "none",
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <Box>
            <Tooltip title="Opciones">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="avatar" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "60px", backgroundColor: "transparent" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.label}
                  onClick={() => {
                    setting.url === "logout"
                      ? handleLogout()
                      : navigate(setting.url);
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
