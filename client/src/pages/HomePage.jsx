import React, { useContext } from 'react';
import Home from '../components/Home/Home';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Admin/Navbar';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  
  const pages = [
    { label: 'Gestión', url: '/admin' },
    { label: 'Votar', url: '/vote' },
    { label: 'Agregar votante', url: '/admin/create-voter' },
  ];

  const settings = [
    { label: 'Cambiar contraseña', url: '/admin/modify-password' },
    { label: 'Cerrar sesión', url: 'logout' }]
    ;


  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection:'column'  }}>
      {user && <Navbar pages={pages} settings={settings} />}
      <Home />
    </div>
  );
};

export default HomePage;
