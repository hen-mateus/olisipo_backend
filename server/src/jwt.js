    const { sign, verify } = require("jsonwebtoken");

    const createTokens = (user) => {
        const accessToken = sign(
            { username: user.email, id: user.id_pessoa },
            "jwtolisipo"
        );

        return accessToken;
    };

    const validateToken = (req, res, next) => {
        const accessToken = req.cookies["access-token"];

        if (!accessToken)
            return res.status(400).json({ error: "User not Authenticated!" });
        try {
            const validToken = verify(accessToken, "jwtolisipo");
            if (validToken) {
                //aqui dá para devolver o id do token - minuto 39 - PedroTech
                req.userId = validToken.id;
                req.authenticated = true;
                return next();
            }
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    };

    module.exports = { createTokens, validateToken };