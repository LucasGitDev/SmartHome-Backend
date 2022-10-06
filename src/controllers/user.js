const User = require("../models/User");
const generate = require("../utils/Bcrypt").generate;

const createUser = async (req, res) => {
  const { login, password, name } = req.body;

  const hasUser = await User.findOne({ login });
  if (hasUser) {
    res.status(400).json({ err: "Usuário já cadastrado" });
    return;
  }

  const hash = await generate(password);

  return res.json(await User.create({ login, password: hash, name }));
};

module.exports = {
  createUser,
};
