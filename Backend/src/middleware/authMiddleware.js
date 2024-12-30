const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ error: "Please provide a valid Bearer token..." });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded.email || !decoded.role) {
      throw new Error("Invalid token payload: email is missing");
    }

    // Add user info to the request object for future use
    req.userName = decoded.email;
    req.role = decoded.role; // Assuming you store the role in the token (admin, candidate, etc.)

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication error:", error);  // Log for debugging purposes
    res.status(401).send({ error: "Authentication failed", message: error.message });
  }
};

module.exports = auth;
