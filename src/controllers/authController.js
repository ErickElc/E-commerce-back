const jwt = require('jsonwebtoken');
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
}
module.exports = authController;