const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
class authController{
    static async authController(req, res, next){
        const token = req.body.token
        if(!token) return res.status(403).send("Acess Denied");
        try{
            const userVerifed = jwt.verify(token, process.env.SECRET_TOKEN);
            req.user = userVerifed;
            res.status(200).send("Acess Granted");
            next();
        }
        catch(err){
            res.status(403).send("Acess Denied");
        }
    }
    static async authAdmin(req, res){
        const token = req.body.token;
        if(!token) return res.status(403).send("Acess Denied");
        try{
            const userVerifed = jwt.verify(token, process.env.SECRET_TOKEN);
            req.user = userVerifed;
            if(req.user.admin !== true) return res.status(403).send("Acess Denied");
            res.status(200).send("Acess Granted");
        }
        catch(err){
            res.status(403).send("Acess Denied");
        }
    }
    static async authPrivatePage(req, res) {
        const token = req.body.token;
        const {id} = req.params
        if(!token) return res.status(403).send('Access Denied');
        try {
            const user = await userModel.findOne({email: req.body.email});
            if(!user) return res.status(403).send('Access denied');
            const selectedUser = jwt.verify(token, process.env.SECRET_TOKEN);
            if(!selectedUser) return res.status(403).send('Access Denied');
            if(id != user._id)  return res.status(403).send('Access Denied22');
            res.status(202).send('Autorizado!')
        } catch (error) {
            res.status(403).send(error)
        }
    }
}
module.exports = authController;