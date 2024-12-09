const express = require("express");
const OrderController = require('../controllers/OrderControllers')
const OrderRouter = express.Router();



OrderRouter.post(
    "/place-order",
    (req, res) => {
        const result = new OrderController().placeOrder(req.body)
        result.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error)

            }
        )
    }
)

OrderRouter.get(
    "/",
    (req, res) => {
        const result = new OrderController().getOrder()
        result.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error)

            }
        )
    }
)







module.exports = OrderRouter;