const { signToken } = require("../helpers/jwt");
const Db = require("../models/dboperations");

class UserController {
  static async registerUser(req, res) {
    try {
      const { userName, email, password } = req.body;
      const newUser = await Db.registerUser(req.body);
      res.status(201).json("Register Sukses");
    } catch (error) {
      console.log(error);
    }
  }

  static async handleLogin(req, res) {
    try {
      const { email, password } = req.body;
      const loginUser = await Db.loginUser(req.body);
      //   console.log(loginUser, ">>>>>>>kskskdks");
      const access_token = signToken({
        username: loginUser.username,
        email: loginUser.email,
      });
      res.status(200).json(access_token);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }
}

module.exports = UserController;
