const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["token"];
  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: "Token inválido." });
  }
};

module.exports = verifyToken;
