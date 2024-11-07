import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
    const [key, setKey] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authenticate = async () => {
        const response = await axios.post('/api/authenticate', key);
        setIsAuthenticated(response.data);
    };

    return (
        <div>
            <input 
                type="text" 
                value={key} 
                onChange={(e) => setKey(e.target.value)} 
                placeholder="Ingrese la llave"
            />
            <button onClick={authenticate}>Autenticar</button>
            {isAuthenticated && <p>Autenticado exitosamente</p>}
        </div>
    );
};

export default AuthForm;
