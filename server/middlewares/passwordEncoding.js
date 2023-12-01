import bcrypt from "bcryptjs";
const passwordEncoder = (req, res, next) => {
  try {
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    req.body.password = hashPassword;
    req.data = req.body;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};
export default passwordEncoder;
