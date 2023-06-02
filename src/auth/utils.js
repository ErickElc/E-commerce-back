const jwt = require("jsonwebtoken");

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
}
module.exports = AuthUtils;
