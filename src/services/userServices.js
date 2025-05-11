const Usuario = require("../models/User.js");
const bcrypt = require("bcrypt");
const {generateToken} = require('../utils/generateToken');
async function crearUsuario(data) {
  try {
    const emailExistente = await Usuario.findOne({ email: data.email });
    const usernameExistente = await Usuario.findOne({
      username: data.username,
    });

    if (emailExistente) {
      throw new Error("El email ya está registrado");
    }

    if (usernameExistente) {
      throw new Error("El nombre de usuario ya está registrado");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const nuevoUsuario = new Usuario({
      ...data,
      password: hashedPassword,
    });

    const usuarioGuardado = await nuevoUsuario.save();
    return usuarioGuardado;
  } catch (error) {
    throw error;
  }
}

async function obtenerUsuarios() {
  try {
    const usuarios = await Usuario.find().select("nombre email rol");
    return usuarios;
  } catch (error) {
    throw error;
  }
}

async function loginUsuario(email, password) {
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      throw new Error("Contraseña incorrecta");
    }

    if (usuario.rol == 'admin') {
      const token = generateToken(usuario);

    return {
      message: 'Login exitoso',
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
      token,
    };
    }
    
    return {
      message: 'Login exitoso',
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      }
    }

  } catch (error) {
    throw error;
  }
}

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  loginUsuario,
};
