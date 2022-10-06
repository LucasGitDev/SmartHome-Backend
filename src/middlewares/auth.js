const jwtService = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    let jwtReceived = req.headers["authorization"];
    const jwt = jwtReceived.split(" ")[1];

    jwtService.verify(jwt, process.env.TOKEN, (err, userInfo) => {
      if (err) {
        res.status(403).json({ mensagem: "Não autorizado" });
        return;
      }

      req.userInfo = userInfo;
      next();
    });
  } catch (err) {
    console.log(err);
  }
};

const login = async (user) => {
  return jwtService.sign(user, process.env.TOKEN,);
};

module.exports = {
  auth,
  login,
};
