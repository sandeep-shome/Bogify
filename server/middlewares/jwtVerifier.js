import jwt from "jsonwebtoken";

export const jwtVerifier = (req, res, next) => {
  try {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, data) => {
      if (err) throw err;
      req.email = data.email;
      next();
    });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
