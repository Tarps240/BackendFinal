const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Expect "Bearer <token"
        const decoded = jwt.verify(token, 'secret_key');
        req.userData = decoded;
        next();
    } catch (error) {
      return res.status(401).json({ message: 'Authentication failed' });  
    }
};

module.exports = authMiddleware;