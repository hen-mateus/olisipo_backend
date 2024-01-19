const jwt = require("jsonwebtoken");

const createTokens = (user) => {
    console.log("Utilizador no JWT:" + user);
    const accessToken = jwt.sign(
        { username: user.email, id: user.id_pessoa, id_tipo: user.id_tipo, },
        "jwtolisipo"
    );
    return accessToken;
};

const validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
    try {
        const decoded = jwt.verify(token.split(' ')[1], 'jwtolisipo');
        // Faça algo com o `decoded`, como adicionar o usuário ao objeto `req` ou `res`
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};

module.exports = { createTokens, validateToken };