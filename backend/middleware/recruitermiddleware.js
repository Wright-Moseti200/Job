let jwt = require("jsonwebtoken");
require("dotenv").config();

let recruiterAuth = (req, res, next) => {
    try {
        let token = req.header("reccuitertoken");
        if (!token || token === "null" || token === "undefined") {
            return res.status(401).json({
                success: false,
                message: "token unavailable"
            });
        }
        let data = jwt.verify(token, process.env.JWT_PAS);
        req.user = data.user;
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { recruiterAuth };