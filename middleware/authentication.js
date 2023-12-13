const { verifyToken } = require("../helpers/jwt");
const Db = require("../models/dboperations");

const authentication = async function (req, res, next) {
  try {
    const { access_token } = req.headers;
    // console.log(access_token, "????????????");
    if (!access_token) {
      throw new Error("Unauthenticated");
    }
    const decoded = verifyToken(access_token);
    // console.log(decoded, ">>>>>>>>jsdsja");

    const findUser = await Db.getUserLogin(decoded.email);
    // console.log(findUser, ">>>>>>>>>>>>>>iniii");
    if (!findUser) {
      throw new Error("Unauthenticated");
    }
    req.user = {
      username: findUser.username,
      email: findUser.email,
    };
  } catch (error) {
    console.log(error);
    res.status(401).json(error.message);
  }
  next();
};

module.exports = authentication;
