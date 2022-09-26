const userModel = require("../models/User");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = bcryptjs.genSaltSync(10);
class userController{
    static async registerUser(req, res){
        try {
            const findEmail = await userModel.findOne({email: req.body.email});
            if(findEmail) return res.status(404).send('Email já utilizado');
            const cryptpassword = bcryptjs.hashSync(req.body.password, salt);
            const createUser = new userModel({
                name: req.body.name,
                email: req.body.email,
                password: cryptpassword,
            });
            await createUser.save();
            res.status(201).send('Usuário Criado Com sucesso');
        } catch (error) {
            res.status(500).send('Não foi possível criar usuário!');
        }
    }
    static async loginUser(req, res){
        try {
            const emailMatch = await userModel.findOne({email: req.body.email});
            if(!emailMatch) return res.status(404).send('E-mail não existe');
            const passwordMatch = bcryptjs.compareSync(req.body.password, emailMatch.password);
            const token = jwt.sign({_id: passwordMatch._id}, process.env.SECRET_TOKEN, {
                expiresIn: '12h', 
            });
            res.status(202).send(token);
            
        } catch (error) {
            res.status(500).send('Não Foi possível fazer login ' + error);
        }
    }
    static async listOneUser(req, res){
        const id = req.params.id;
        if(!id)return res.status(400).send('Não foi possível listar o usuário, pois o id não foi informado!');
        try {
            const userSelected = await userModel.findOne({_id: id});
            const userData = {
                _id: userSelected._id,
                name: userSelected.name,
                email: userSelected.email,
                createdDate: userSelected.createdDate
            };
            res.status(200).send(userData);
        } catch (error) {
            res.status(400).send('Houve um erro: '+ error);
        }
    }
    static async listAllUsers(req, res){
        try {
            const usersList = await userModel.find();
            res.status(200).send(usersList);
        } catch (error) {
            res.status(400).send('Não foi possível buscar os usuários');
        }
    }
}


module.exports = userController;