const jwt = require("jsonwebtoken");
const { configs } = require("../configs/secrets");

exports.auth = (req, res, next) => {
    const token = req.header("x-api-key");
    if (!token) {
        return res.status(401).json({ err: "token not found" });
    }
    try {
        const decodeToken = jwt.verify(token, configs.TOKENSECRET);
        req.tokenData = decodeToken;
        next();
    }
    catch (err) {
        res.status(401).json({ error: err, err: "token invalid or expired" })
    }
}

exports.authAdmin = (req, res, next) => {
    const token = req.header("x-api-key");
    if (!token) {
        return res.status(401).json({ err: "token not found" });
    }
    try {
        const decodeToken = jwt.verify(token, configs.TOKENSECRET);
        if (decodeToken.role != "admin" && decodeToken.role != "superAdmin") {
            return res.status(401).json({ err: "not admin" })
        }
        req.tokenData = decodeToken;
        next();
    }
    catch (err) {
        res.status(401).json({ err, err: "token invalid or expired" })
    }
}