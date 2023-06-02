const formatPublicData = require("../utils/data");
const userModel = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcryptjs.genSaltSync(10);
/*
  USERS CONTROLLER
  1. modificar dados do usuário FEITO
  2. deletar usuário FEITO
  5. Modificar os produtos 
  6. criar categorias
  7. modificar categorias
  8. deletar categorias
  9. deletar produtos
  10. adicionar imagem aos produtos
  11. adicionar imagem ao usuário
  12. adicionar imagem a categoria
  13. adicionar métodos de pagamento na plataforma
  
*/
class userController {
  static async registerUser(req, res) {
    try {
      const findEmail = await userModel.findOne({ email: req.body.email });
      if (findEmail) return res.status(404).send("Email já utilizado");
      const encryptedPassword = bcryptjs.hashSync(req.body.password, salt);
      const createUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword,
      });
      await createUser.save();
      res.status(201).send("Usuário Criado Com sucesso");
    } catch (error) {
      res.status(500).send("Não foi possível criar usuário!" + error);
    }
  }

  static async loginUser(req, res) {
    try {
      const userSelected = await userModel.findOne({ email: req.body.email });
      if (!userSelected) return res.status(404).send("E-mail não existe");
      const passwordMatch = bcryptjs.compareSync(
        req.body.password,
        userSelected.password
      );
      if (!passwordMatch) return res.status(400).send("Senha incorreta");
      const token = jwt.sign(
        {
          _id: userSelected._id,
          name: userSelected.name,
          email: userSelected.email,
          admin: userSelected.admin,
        },
        process.env.SECRET_TOKEN,
        {
          expiresIn: "12h",
        }
      );
      res.status(202).send(token);
    } catch (error) {
      res.status(500).send("Não Foi possível fazer login " + error);
    }
  }

  static async listOneUser(req, res) {
    const id = req.params.id;
    if (!id)
      return res
        .status(400)
        .send("Não foi possível listar o usuário, verifique se o id informado");
    try {
      const userSelected = await userModel.findOne({ _id: id });
      if (!userSelected)
        return res
          .status(400)
          .send(
            "Não foi possível listar o usuário, verifique se o id informado"
          );
      const userData = {
        _id: userSelected._id,
        name: userSelected.name,
        email: userSelected.email,
        createdDate: userSelected.createdDate,
      };
      res.status(200).send(userData);
    } catch (error) {
      res.status(500).send("Houve um erro: " + error);
    }
  }

  static async userEmailData(req, res) {
    try {
      const userEmail = await userModel.findOne({ email: req.query.email });

      if (!userEmail)
        return res.status(404).send("Não foi possível buscar esse e-mail");
      const userData = {
        _id: userEmail._id,
        name: userEmail.name,
        email: userEmail.email,
        createdDate: userEmail.createdDate,
      };
      res.status(200).send(userData);
    } catch (error) {
      if (!userVerified)
        return res
          .status(403)
          .send("You are not authorized to access this page");
      res.status(400).send("Não foi possível buscar o usuário");
    }
  }

  static async updateUserData(req, res) {
    const id = req.params.id;
    const { name, age, phoneNumber } = req.body;
    if (!name && !age && !phoneNumber)
      return res.status(400).send("Não foi possível atualizar os dados!");
    try {
      const userSelected = await userModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name: name,
            age: age,
            phoneNumber: phoneNumber,
          },
        }
      );

      if (!userSelected)
        return res
          .status(400)
          .send("Não foi possível atualizar os dados do usuário");

      const userUpdated = await userModel.findOne({ _id: id });

      if (!userUpdated)
        return res
          .status(500)
          .send("Os dados foram atualizados, mas não foram retornados");

      const userData = formatPublicData(userUpdated);

      res.status(200).send(userData);
    } catch (error) {
      res.status(500).send("Não foi possível atualizar o usuário");
    }
  }
  static async deleteUser(req, res) {
    const id = req.params?.id;
    if (!id) return res.status(400).send("Não foi possível deletar o usuário");
    try {
      const selectedUser = await userModel.findOneAndDelete({ _id: id });

      if (!selectedUser) return res.status(404).send("Usuário não encontrado");

      res.status(200).send("Usuário deletado com sucesso");
    } catch (error) {
      res.status(500).send("Não foi possível deletar o usuário");
    }
  }
}

module.exports = userController;
