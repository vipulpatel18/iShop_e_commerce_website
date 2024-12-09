const express = require("express");
const AdminRouter = express.Router();
const adminControllers = require("../controllers/AdminControllers")

AdminRouter.post(
    '/register',
    (req, res) => {
        const result = new adminControllers().register(req.body)
        result.then(
            (responce) => {
                res.send(responce)
            }
        )
            .catch(
                (error) => {
                    res.send(error)
                }
            )
    }
)

AdminRouter.post(
    '/login',
    (req, res) => {
        // console.log(req.body)
        // return
        const result = new adminControllers().login(req.body)
        result.then(
            (responce) => {
                res.send(responce)
            }
        )
            .catch(
                (error) => {
                    res.send(error)
                }
            )
    }
)

AdminRouter.put("/update/:id", async (req, res) => {
    const result = new adminControllers().adminupdate(req.body,req.params.id)
    result.then(
        (responce)=>{
            res.send(responce)
        }
       )
       .catch(
        (error)=>{
            res.send(error)
        }
       )
});

AdminRouter.get(
    '/:id?',
    (req, res) => {
        const result = new adminControllers().getAdmin(req.params.id)
        result.then(
            (responce) => {
                res.send(responce)
            }
        )
            .catch(
                (error) => {
                    res.send(error)
                }
            )
    }
)

module.exports = AdminRouter;