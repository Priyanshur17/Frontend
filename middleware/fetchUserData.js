const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_SIGN;

const fetchUser = (req, res, next) => {
    // Get the user from JWT token & put user id as req object
    const token = req.header("auth-token");
    // Check if there is no token in header
    if (!token) {
        res.status(401).send({ error: "Authentication Failed, Token Not Found." });
    }
    try {
        // Verify the token with Secret signature & get the request of user
        const dataString = jwt.verify(token, JWT_SECRET);
        req.user = dataString.user;
        next();
    } catch (err) {
        // Or send the status "401" (Unauthorized)
        res.status(401).send({ error: "Authentication Failed, Invalid Token." })
    }
}

module.exports = fetchUser;