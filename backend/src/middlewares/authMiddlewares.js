const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // Obtener el header
        const authHeader = req.headers.authorization;

        // Verificar que exista
        if (!authHeader) {
            return res.status(401).json({
                message: "Token no proporcionado",
            });
        }

        // Separar bearer del token
        const [type, token] = authHeader.split(" ");

        // Verificar el formato
        if (type !== "Bearer" || !token) {
            return res.status(401).json({
                message: "Formato de token inválido",
            });
        }

        // Verificar el token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Guardar la información del usuario en la request
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token inválido o expirado",
        });
    }
};

module.exports = authMiddleware;

