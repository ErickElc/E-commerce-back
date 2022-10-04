const AdressModel = require('../models/Adress');
const jwt = require('jsonwebtoken');


class adressController {
    static async userAdress(req, res){
        const {id} = req.params;
        try {
            const findAdress = await AdressModel.findOnde({userId: id})
                .populate({path: 'userId', selected: 'name email admin createdDate'})
                .exec();
            res.status(200).send(findAdress);
        } catch (error) {
            res.status(404).send('Não foi possível buscar esse usuário!');
        }
    }
    static async registerAdress (req, res){
        const NewAdress = new AdressModel({
            logradouro: req.body.logradouro,
            complemento1: req.body.complemento1,
            complemento2: req.body?.complemento2,
            userId: req.body.userId,
            cep: req.body.cep,
        });
        try {
            const authorization  = jwt.verify(req.body.token, process.env.SECRET_TOKEN);
            if(!authorization) return res.status(403).send('Fobidden');
            await NewAdress.save();
            res.status(201).send('Endereço cadastrado com sucesso!')
        } catch (error) {
            res.status(500).send('Houve um erro!')
        }
    }
}
module.exports = adressController;