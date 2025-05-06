const express = require('express');
const router = express.Router();

// Ruta raíz con query params para personalización
// GET /?lang=es&theme=dark
router.get('/', (req, res) => {
    const { lang, theme } = req.query;
    let mensaje = '¡Bienvenido a nuestra API!';
    
    if (lang === 'en') {
        mensaje = 'Welcome to our API!';
    } else if (lang === 'fr') {
        mensaje = 'Bienvenue sur notre API!';
    }

    res.send(`${mensaje} [Tema: ${theme || 'light'}]`);
});

// Ruta about con parámetros opcionales
// GET /about?section=team&details=true
router.get('/about', (req, res) => {
    const { section, details } = req.query;
    let response = 'Información general sobre nuestra API';

    if (section === 'team') {
        response = 'Información sobre nuestro equipo';
    } else if (section === 'mission') {
        response = 'Nuestra misión y visión';
    }

    if (details === 'true') {
        response += ' (Versión detallada)';
    }

    res.send(response);
});

// Ruta contact con método POST para enviar mensajes
// POST /contact
router.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    res.send(`Mensaje recibido de ${name || 'Anónimo'}:
        Email: ${email || 'No proporcionado'}
        Mensaje: ${message || 'No hay mensaje'}`);
});

// Ruta para newsletter con query params
// GET /newsletter?subscribe=true&email=user@example.com
router.get('/newsletter', (req, res) => {
    const { subscribe, email } = req.query;
    
    if (subscribe === 'true' && email) {
        res.send(`Email ${email} suscrito al newsletter`);
    } else if (subscribe === 'false' && email) {
        res.send(`Email ${email} dado de baja del newsletter`);
    } else {
        res.send('Por favor proporciona un email y especifica subscribe=true/false');
    }
});

module.exports = router; 