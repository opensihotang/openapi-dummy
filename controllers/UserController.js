const { signToken } = require("../helpers/jwt");
const Db = require("../models/dboperations");

class UserController {
  static async registerUser(req, res) {
    try {
      const { userName, email, password } = req.body;
      const newUser = await Db.registerUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  static async handleLogin(req, res) {
    try {
      const { email, password } = req.body;
      const loginUser = await Db.loginUser(req.body);
      //   console.log(loginUser, ">>>>>>>kskskdks");
      const accesstoken = signToken({
        username: loginUser.username,
        email: loginUser.email,
      });
      res.status(200).json(accesstoken);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }
}

module.exports = UserController;
