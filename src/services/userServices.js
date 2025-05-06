const Usuario = require('../models/User.js');
const bcrypt = require('bcrypt');

async function crearUsuario(data) {
    try {
      const usuarioExistente = await Usuario.findOne({ email: data.email });
      if (usuarioExistente) {
        throw new Error('El email ya está registrado');
      }
  
   
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      console.log('Contraseña encriptada:', hashedPassword);
   
      const nuevoUsuario = new Usuario({
        ...data,
        password: hashedPassword 
      });
  
      const usuarioGuardado = await nuevoUsuario.save();
      return usuarioGuardado;
  
    } catch (error) {
      throw error;
    }
  }

async function obtenerUsuarios() {
    try {
        const usuarios = await Usuario.find().select('nombre email');
      return usuarios;
    } catch (error) {
      throw error;
    }
}
  
async function loginUsuario(email, password) {
    try {
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
  
      const esValida = await bcrypt.compare(password, usuario.password);
      if (!esValida) {
        throw new Error('Contraseña incorrecta');
      }
  
      return usuario;
  
    } catch (error) {
      throw error;
    }
  }

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    loginUsuario
};
