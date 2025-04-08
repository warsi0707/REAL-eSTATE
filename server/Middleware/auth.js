const jwt = require("jsonwebtoken");
const {JWT_USER_SECRETE } = require("../Config");




function userAuth(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(404).json({
                message: "Login required!",
                authenticated: false
            })
        }
        const decode = jwt.verify(token,  JWT_USER_SECRETE)
        
        if (!decode) {
            return res.status(404).json({
                message: "Login required!",
                authenticated: false
            })
        }
        req.user = decode.id
        next()
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }


}
module.exports = {
    userAuth
}