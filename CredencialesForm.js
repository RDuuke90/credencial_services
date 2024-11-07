import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CredencialesForm = () => {
    const [credenciales, setCredenciales] = useState([]);
    const [servicio, setServicio] = useState('');
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    const fetchCredenciales = async () => {
        try {
            const response = await axios.get('/api/credenciales');
            setCredenciales(response.data);
        } catch (error) {
            console.error('Error fetching credentials:', error);
        }
    };

    const addCredencial = async () => {
        try {
            const newCredencial = { servicio, usuario, password };
            await axios.post('/api/credenciales', newCredencial);
            fetchCredenciales();
        } catch (error) {
            console.error('Error adding credential:', error);
        }
    };

    const deleteCredencial = async (servicio) => {
        try {
            await axios.delete(`/api/credenciales/${servicio}`);
            fetchCredenciales();
        } catch (error) {
            console.error('Error deleting credential:', error);
        }
    };

    useEffect(() => {
        fetchCredenciales();
    }, []);

    return (
        <div>
            <input 
                type="text" 
                value={servicio} 
                onChange={(e) => setServicio(e.target.value)} 
                placeholder="Servicio"
            />
            <input 
                type="text" 
                value={usuario} 
                onChange={(e) => setUsuario(e.target.value)} 
                placeholder="Usuario"
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Contraseña"
            />
            <button onClick={addCredencial}>Agregar Credencial</button>
            
            <ul>
                {credenciales.map(c => (
                    <li key={c.servicio}>
                        {c.servicio} - {c.usuario}
                        <button onClick={() => deleteCredencial(c.servicio)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CredencialesForm;
