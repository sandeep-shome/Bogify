import bcrypt from "bcryptjs";

export const passwordChaker = (hashPass, pass) => {
  const isPasswordCorrect = bcrypt.compareSync(pass, hashPass);
  if (!isPasswordCorrect)
    return res.status(401).json({ error: "Invalid Password" });
};
