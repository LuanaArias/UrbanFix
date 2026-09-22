const express = require("express");

const { register, login, } = require("../controllers/authControllers");
const validateRegister = require("../middlewares/validateRegister");
const authMiddleware = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post(
  "/register",
  validateRegister,
  register
);

router.post( 
    "/login", 
    login 
);

// ruta para probar el jwt 
router.get( "/profile", authMiddleware, (req, res) => { res.json({ message: "Accediste a una ruta protegida", user: req.user, }); } );

module.exports = router;
