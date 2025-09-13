const jwt = require('jsonwebtoken');

const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Please Login and provide token",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultkey");
    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT Middleware Error:", error.message);
    res.status(401).send({
      success: false,
      message: "Auth Middleware Error: " + error.message,
    });
  }
};

module.exports = requireSignIn;
