import React from 'react';
import { useNavigate } from 'react-router-dom';  
import './home.css';
import { Button, Grid2, Typography } from '@mui/material';

const Home = () => {
    const navigate = useNavigate();
    
    const handleVote = () => {
        navigate('/vote');  
    };

    const handleAdminLogin = () => {
        navigate('/login'); 
    };

    return (
        <Grid2 className="home-container">
            <Typography variant='h1' className='title'>Bienvenido al Sistema de Votación</Typography>
            <Grid2 className="button-container">
                <Typography className='subtitle'>¿Qué deseas hacer?</Typography>
                <Button className='button' onClick={handleVote}>Votar</Button>
                <Button className='button' onClick={handleAdminLogin}>Ingresar como Admin</Button>
            </Grid2>
        </Grid2>
    );
};

export default Home;
