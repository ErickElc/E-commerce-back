const crypto = require("crypto");

const secret = "m41ld8wsla2";

class paymentController {
  static async paymentWebHook(req, res) {
    let data = {};

    try {
      data = req.body;
    } catch (error) {
      console.log(error)
      return res.status(400).send({ error });
    }

    const { signature } = req.query;

    const calculatedSignature = crypto
      .createHmac("sha1", secret)
      .update(JSON.stringify(data))
      .digest("hex");

    if (signature !== calculatedSignature) {
      return res.status(400).send({ error: "Incorrect signature" });
    }

    console.log("Webhook received", data);
    res.status(200).send(data);
  }
}

module.exports = paymentController;
