const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRETE, JWT_USER_SECRETE } = require("../Config");


function adminAuth(req, res, next) {
    try {
        const adminToken = req.cookies.adminToken;
        if (!adminToken) {
            return res.status(404).json({
                message: "Login Required!",
                adminAuthenticated: false
            })
        }
        const decode = jwt.verify(adminToken, JWT_ADMIN_SECRETE)
        if (!decode) {
            return res.status(404).json({
                message: "Login Required!",
                userAuthenticated: false
            })
        }
        req.user = decode.adminId
        next()

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

function userAuth(req, res, next) {
    try {
        const userToken = req.cookies.userToken;
        if (!userToken) {
            return res.status(404).json({
                message: "Login required!",
                userAuthenticated: false
            })
        }
        const decode = jwt.verify(userToken, JWT_USER_SECRETE)
        if (!decode) {
            return res.status(404).json({
                message: "Login required!",
                userAuthenticated: false
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
    adminAuth,
    userAuth
}