const mongoose = require('mongoose');


const AdressSchema = mongoose.Schema({
    logradouro: {type: String, required: true},
    bairro: {type: String, required:true},
    complemento1: {type: String, required: true},
    complemento2: {type: String},
    cep:{type:String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"user", required: true},    
    createdDate: {type: Date, default: Date.now()}
})


const AdressModel = mongoose.model('adress', AdressSchema)