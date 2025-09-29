import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

export const isEmployer = (req, res, next) => {
  if (req.user.role !== "employer") {
    return res.status(403).json({ error: "Access denied. Employers only." });
  }
  next();
};
