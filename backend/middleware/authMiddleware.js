// This middleware checks if a request has a valid JWT token.
// We use it to "protect" routes that should only work for logged-in users.

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  // Tokens are sent in the request header like:
  // Authorization: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract just the token part (remove "Bearer ")
      token = req.headers.authorization.split(" ")[1];

      // Verify the token is valid and not expired/tampered with
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the logged-in user's info to the request object
      // (minus the password) so later code (controllers) can use req.user
      req.user = await User.findById(decoded.id).select("-password");

      next(); // token is valid, continue to the actual route
    } catch (error) {
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

export default protect;
