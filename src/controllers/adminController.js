const formatPublicData = require("../utils/data");
const userModel = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcryptjs.genSaltSync(10);
/*
  Admin CONTROLLER
  1. tornar o usuário admin
  2. remover o admin do usuário
  3. Modificar a conta do usuário
  4. deletar conta de usuário
  5. Modificar os produtos
  6. criar categorias
  7. modificar categorias
  8. deletar categorias
  */

class adminController {
  static async getAllUsers(req, res) {
    try {
      const usersList = await userModel.find();
      const userListFiltrated = [];

      for (let i in usersList) {
        userListFiltrated.push({
          _id: usersList[i]._id,
          name: usersList[i].name,
          email: usersList[i].email,
          admin: usersList[i].admin,
          createdDate: usersList[i].createdDate,
        });
      }
      res.status(200).send(userListFiltrated);
    } catch (error) {
      res.status(400).send("Não foi possível buscar os usuários");
    }
  }

  static async getOneUser(req, res) {
    const id = req.params.id;
    if (!id)
      return res
        .status(400)
        .send("Não foi possível listar o usuário, verifique se o id informado");
    try {
      const userSelected = await userModel.findOne({ _id: id.toString() });
      if (!userSelected) return res.status(200).send([]);
      const userData = formatPublicData(userSelected);
      res.status(200).send(userData);
    } catch (error) {
      res.status(400).send("Não foi possível listar o usuário");
    }
  }

  static async getListOfAdmins(req, res) {
    try {
      const adminsList = await userModel.find({ admin: true });
      if (adminsList.length === 0) return res.status(200).send([]);
      res.status(200).send(adminsList);
    } catch (error) {
      res.status(500).send("Não foi possível listar os administradores");
    }
  }

  static async makeAdmin(req, res) {
    const id = req.params.id;
    if (!id)
      return res
        .status(400)
        .send("Não foi possível tornar o usuário administrador");
    try {
      const userSelected = await userModel.findOneAndUpdate(
        { _id: id.toString() },
        { $set: { admin: true } }
      );
      if (!userSelected) return res.status(404).send("Usuário não encontrado");
      res.status(200).send("Usuário agora é administrador");
    } catch (error) {
      res.status(500).send("Não foi possível tornar o usuário administrador");
    }
  }
  // PENSANDO EM UMA LÓGICA PAR ISSO
  // static async removeAdmin(req, res) {

  // }

  static async modifyUser(req, res) {
    const id = req.params.id;
    if (!id)
      return res.status(400).send("Não foi possível modificar o usuário");
    try {
      const userSelected = await userModel.findOne({ _id: id.toString() });
      if (!userSelected) return res.status(404).send("Usuário não encontrado");
      const passwordHash = bcryptjs.hashSync(password, salt);
      await userModel.findOneAndUpdate(
        { _id: id.toString() },
        {
          $set: {
            name: req.body.name ? req.body.name : userSelected.name,
            phoneNumber: req.body.phoneNumber,
            cpf: req.body.cpf ? req.body.cpf : userSelected.cpf,
            email: req.body.email ? req.body.email : userSelected.email,
            password: passwordHash ? passwordHash : userSelected.password,
            age: req.body.age ? req.body.age : userSelected.age,
          },
        }
      );
      const userUpdated = await userModel.findOne({ _id: id.toString() });
      res.status(200).send(userUpdated);
    } catch (error) {
      res.status(500).send("Não foi possível modificar o usuário");
    }
  }

  static async removeUser(req, res) {
    const id = req.params.id;
    if (!id) return res.status(400).send("Não foi possível remover o usuário");
    try {
      const userSelected = await userModel.findOne({ _id: id.toString() });
      if (!userSelected) return res.status(404).send("Usuário não encontrado");
      await userModel.findOneAndDelete({ _id: id.toString() });
      const deletedUser = await userModel.findOne({ _id: id.toString() });
      if (deletedUser)
        return res.status(400).send("Não foi possível remover o usuário");
      res.status(200).send("Usuário removido com sucesso");
    } catch (error) {
      res.status(500).send("Não foi possível remover o usuário");
    }
  }
}

module.exports = adminController;
