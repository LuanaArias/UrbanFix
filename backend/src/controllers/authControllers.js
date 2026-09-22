const jwt = require("jsonwebtoken");
const { registerUser, loginUser } = require("../services/authServices");

const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const usuario = await registerUser(
      nombre,
      email,
      password
    );

    res.status(201).json({
      message: "Usuario registrado correctamente",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        role: usuario.role,
        createdAt: usuario.createdAt,
      },
    });
  } catch (error) {
    console.error(error);

    if (error.statusCode) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const login = async (req, res) => { 
    try { 
        const { email, password } = req.body; 
        const usuario = await loginUser(email, password); 
        const token = jwt.sign( { id: usuario.id, role: usuario.role, }, process.env.JWT_SECRET, { expiresIn: "2h", } ); 
        res.status(200).json({ message: "Login exitoso", 
            token, 
            usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, role: usuario.role, }, 
        }); 
    } catch (error) { 
        console.error(error); 
        if (error.statusCode) { 
            return res.status(error.statusCode).json({ message: error.message, }); 
        } 
        res.status(500).json({ message: "Error interno del servidor", }); 
    } 
}; 

module.exports = { register, login, };