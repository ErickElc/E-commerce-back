const {calcularPrecoPrazo} = require('correios-brasil');

class entregaController{
    static async precoPrazoProduto(req, res){
        const {id} = req.params;
        let args = {
            // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
            sCepOrigem: '81200100',
            sCepDestino: `${id}`,
            nVlPeso: '1',
            nCdFormato: '1',
            nVlComprimento: '20',
            nVlAltura: '20',
            nVlLargura: '20',
            nCdServico: ['04014', '04510'], //Array com os códigos de serviço
            nVlDiametro: '0',
          };
        const response = await calcularPrecoPrazo(args)
        const responseData = {
            Valor: response[1].Valor,
            PrazoEntrega: response[1].PrazoEntrega
        }
        res.status(200).send(responseData);
    }
}


module.exports = entregaController;