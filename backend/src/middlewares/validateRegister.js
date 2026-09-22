const validateRegister = (req, res, next) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({
      message: "Nombre, email y contraseña son obligatorios",
    });
  }

  next();
};

module.exports = validateRegister;