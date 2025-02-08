import React from 'react';
import { useNavigate } from 'react-router-dom';  

const Home = () => {
    const navigate = useNavigate();

    
    const handleVote = () => {
        navigate('/votar');  
    };

    const handleAdminLogin = () => {
        navigate('/login'); 
    };

    return (
        <div className="home-container">
            <h1>Bienvenido al Sistema de Votación</h1>
            <div className="button-container">
                <button onClick={handleVote}>Votar</button>
                <button onClick={handleAdminLogin}>Ingresar como Admin</button>
            </div>
        </div>
    );
};

export default Home;
