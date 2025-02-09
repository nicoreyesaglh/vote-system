import { AppBar, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import Navbar from '../components/Admin/Navbar';
import { Route, Routes } from 'react-router-dom';
import Votes from '../components/Admin/Votes/Votes';

const AdminPage = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const pages = [
    { label: 'Candidatos más votados', url: '/admin/most-voted' },
    { label: 'Votos', url: '/admin/votes' },
    { label: 'Agregar votante', url: '/admin/create-voter' },
  ];

  const settings = [
    { label: 'Cambiar contraseña', url: '/admin/modify-password' },
    { label: 'Cerrar sesión', url: 'logout' }]
    ;

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection:'column' }}>
      <Navbar pages={pages} settings={settings} />

      <Routes>
          <Route index element={<Votes />} />
          <Route path="votes" element={<Votes />} />
          {/* <Route path="most-voted" element={<TopVotedCandidates />} />
          <Route path="vote-detail" element={<VoteDetail />} />
          <Route path="create-voter" element={<CreateVoter />} />
          <Route path="modify-password" element={<ModifyPassword />} /> */}
      </Routes>
      
    </div>
  );
};

export default AdminPage;
