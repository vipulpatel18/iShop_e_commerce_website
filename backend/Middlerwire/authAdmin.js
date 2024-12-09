const { varifyToken } = require("../Help");

const authAdmin = (req,res,next) => {
    const authToken = req.headers?.authorization
    if (authToken) {
        if (varifyToken(authToken)) {
            next()
        }else{
            res.send(
                {
                    "msg" : "Please provide token",
                    status : 0
                }
            )
        }
    }else{
        res.send(
            {
                "msg" : "Please provide token",
                status : 0
            }
        )
    }
}

module.exports=authAdmin;