const jwt = require("jsonwebtoken");
const axios = require("axios");
class AuthUtils {
  static validateToken(token) {
    if (!token) return false;
    try {
      const userVerified = jwt.verify(token, process.env.SECRET_TOKEN);
      if (!userVerified) return false;
      return userVerified;
    } catch (err) {
      return false;
    }
  }
  static async generateTokenKiwify(){
    try {
      const options = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_secret: process.env.CLIENT_SECRET_KIWI,
          client_id: process.env.CLIENT_ID,
        }),
      };
      const response = axios.post(`${process.env.KIWIFY_API}/v1/oauth/token`, options.body, options.headers);
      return response;
    } catch (error) {
      return error;
    }
  }
}
module.exports = AuthUtils;
