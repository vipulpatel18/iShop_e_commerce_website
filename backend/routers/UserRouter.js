const express = require("express");
const UserRouter = express.Router();
const UserControllers = require("../controllers/UserControllers");
// const userControllers = require("../controllers/UserControllers");

UserRouter.post(
    '/register',
    (req, res) => {
        const result = new UserControllers().register(req.body)
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

UserRouter.get(
    '/:id?',
    (req, res) => {
        const result = new UserControllers().getUser(req.params.id)
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

UserRouter.post(
    '/login',
    (req, res) => {
        // console.log(req.body)
        // return
        const result = new UserControllers().login(req.body)
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

UserRouter.post(
    '/add-address/:id',
    (req, res) => {
        const result = new UserControllers().addressUpdate(req.body, req.params.id)
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

UserRouter.put(
    "/update/:id",
    async (req, res) => {
        const result = new UserControllers().userupdate(req.body, req.params.id)
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
    });

UserRouter.post(
    "/moveToCart/:id",
    (req, res) => {
        // console.log(req.body, req.params.id)
        // return
        const result = new UserControllers().movetocart(req.params.id, req.body)
        result
            .then((responce) => {
                res.send(responce)
            })
            .catch((error) => {
                res.send(error)
            })
    })

module.exports = UserRouter;