const {
  crearUsuario,
  loginUsuario,
  obtenerUsuarios,
} = require('../services/userServices');

const {
  createUserValidations,
  validateResult
} = require('../validations/userValidations');
const {
  sendEmail
} = require('../services/mailer');


const userController = {
  createUser: [
    ...createUserValidations,
    validateResult,
    async (req, res) => {
      try {
        const contenido = 'Me complace anunciarte que has sido registrado correctamente en la app';
        const { nombre, email } = req.body;
        console.log(email)
        const result = await crearUsuario(req.body);
        sendEmail(nombre,email,contenido)
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
  ],

  loginUser: [
    async (req, res) => {
      try {
        const { email, password } = req.body;
        const result = await loginUsuario(email,password);
        res.status(200).json(result);
      } catch (error) {
        res.status(401).json({ message: error.message });
      }
    },
  ],
  getUsuarios: [
    async (req, res) => {
      try {
        const result = await obtenerUsuarios();
        res.status(200).json(result);
      } catch (error) {
        res.status(401).json({ message: error.message });
      }
    }
  ]
};

module.exports = userController;
