const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");

const registerUser = async (nombre, email, password) => {
  // Verificar si el email ya existe
  const usuarioExistente = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (usuarioExistente) {
    const error = new Error("El email ya está registrado");
    error.statusCode = 409;
    throw error;
  }

  // Encriptar la contraseña
  const passwordHash = await bcrypt.hash(password, 10);

  // Crear usuario
  const usuario = await prisma.user.create({
    data: {
      nombre,
      email,
      password: passwordHash,
    },
  });

  return usuario;
};

const loginUser = async (email, password) => { 
    // buscar el usuario por email 
    const usuario = await prisma.user.findUnique({ where: { email, }, }); 
    // si no existe 
    if (!usuario) { 
        const error = new Error("Email o contraseña incorrectos"); 
        error.statusCode = 401; throw error; 
    } 
    // comparar contraseña ingresada con la contraseña hasheada 
    const passwordValida = await bcrypt.compare( password, usuario.password ); 
    if (!passwordValida) { 
        const error = new Error("Email o contraseña incorrectos"); 
        error.statusCode = 401; 
        throw error; 
    } 
    return usuario; 
}; 

module.exports = { registerUser, loginUser, };
