const { validateToken } = require("./utils");
const userModel = require("../models/User");
const jwt = require("jsonwebtoken");

class authController {
  static async verifyToken(req, res) {
    const token = req.headers.t;
    if (!token) return res.status(403).send("Access Denied");
    try {
      const userVerified = jwt.verify(token, process.env.SECRET_TOKEN);

      if (!userVerified) return res.status(403).send("Access Denied");

      res.status(200).send("Access Granted");
    } catch (err) {
      res.status(403).send("Access Denied");
    }
  }

  static async authAdmin(req, res) {
    const token = req.headers.t;
    if (!token) return res.status(403).send("Access Denied");
    try {
      const userSelected = validateToken(token);
      if (!userSelected) return res.status(403).send("Access Denied");

      const compareAdmin = await userModel.findOne({ _id: userSelected._id });

      if (!compareAdmin.admin) return res.status(403).send("Access Denied");

      res.status(200).send("Access Granted");
    } catch (err) {
      res.status(403).send("Access Denied");
    }
  }

  static async verifyAccess(req, res) {
    const token = req.headers.t;
    if (!token)
      return res.status(403).send("You are not authorized to access this page");

    const id = req.params?.id;
    if (!id)
      return res.status(403).send("You are not authorized to access this page");

    try {
      const userValidate = validateToken(token);
      if (!userValidate)
        return res
          .status(403)
          .send("You are not authorized to access this page");
      const userSelected = await userModel.findOne({ _id: userValidate._id });
      if (userSelected._id.toString() !== id)
        return res.status(403).send("Access Denied");
      res.status(200).send("Access Granted");
    } catch (error) {
      res.status(500).send(`There was an error: ${error}`);
    }
  }

  static async verifyAccessEmail(req, res, next) {
    const token = req.headers.t;
    if (!token)
      return res.status(403).send("You are not authorized to access this page");

    const email = req.query.email;
    if (!email)
      return res.status(403).send("You are not authorized to access this page");

    try {
      const userValidate = validateToken(token);
      if (!userValidate)
        return res
          .status(403)
          .send("You are not authorized to access this page");
      const userSelected = await userModel.findOne({
        email: userValidate.email,
      });

      if (userSelected.email !== email)
        return res.status(403).send("Access Denied");
      res.status(200).send("Access Granted");
    } catch (error) {
      res.status(500).send(`There was an error: ${error}`);
    }
  }
}
module.exports = authController;
