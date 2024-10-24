import jwt from 'jsonwebtoken';

const secretKey = 'SECRET';  


const authenticateJWT = (req, res, next) => {
  // Intentamos recuperar el token de las cookies
  const token = req.cookies.coderCookieToken;  

  // Si no hay token, denegar acceso
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    // Verificar el token usando la clave secreta
    const decoded = jwt.verify(token, secretKey);

    // Si el token es válido, almacenamos los datos del usuario en req.user
    req.user = decoded;

    // Continuar con la siguiente función (ruta protegida)
    next();
  } catch (error) {
    // Si el token es inválido o ha expirado
    return res.status(401).json({ error: `Invalid token: ${error.message}` });
  }
};

export default authenticateJWT;
