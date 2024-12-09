const CartModel = require("../models/cartModel")
const OrderModel = require("../models/OrderModel")
const Razorpay = require('razorpay');


var instance = new Razorpay({
    key_id: process.env.RAZOREPAY_KEY,
    key_secret: process.env.RAZOREPAY_SECRET_KEY,
});


class OrderController {
    placeOrder(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const { user_id, address, paymentMode, order_total } = data
                    const Cartmodel = await CartModel.find({ user_id }).populate("product_id", '_id final_price')
                    const product_details = Cartmodel.map((cd) => {
                        return {
                            product_id: cd.product_id._id,
                            quantity: cd.quantity,
                            price: (cd.product_id.final_price * cd.quantity),
                            total: order_total
                        }
                    })

                    const order = new OrderModel({
                        user_id: user_id,
                        product_details: product_details,
                        order_total: order_total,
                        payment_mode: paymentMode,
                        shipping_details: address
                    })

                    order.save().then(
                        () => {
                            if (paymentMode == 0) {
                                //COD
                                resolve(
                                    {
                                        msg: "Order Place",
                                        status: 1,
                                        order_id: order._id
                                    }
                                )

                            } else {
                                //online payment
                                this.initPaymentGateway(order._id, order_total)
                                    .then((razorpay_order) => {
                                        resolve({
                                            msg: "Order Place",
                                            status: 1,
                                            razorpay_order
                                        })
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                        reject(
                                            {
                                                msg: error.msg,
                                                status: 0,
                                            }
                                        )
                                    })
                            }

                        }
                    ).catch((error) => {
                        reject(
                            {
                                msg: "Unable to Place Order",
                                status: 0,
                            }
                        )
                    })

                } catch (error) {
                    console.log(error)
                    reject(
                        {
                            msg: "Internal Server Error",
                            status: 0
                        }
                    )
                }
            }
        )
    }

    initPaymentGateway(order_id, order_total) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    // const orderExits = await OrderModel.findOne({ user_id: order_id })
                    // if (orderExits) {
                    //     reject({
                    //         msg: "order Allready Exits",
                    //         status: 0
                    //     })
                    //     return
                    // }
                    var options = {
                        amount: order_total * 100,  // amount in the smallest currency unit
                        currency: "INR",
                        receipt: `order_rcptid_${order_id}`
                    };
                    instance.orders.create(options, async function (err, order) {
                        if (err) {
                            console.log(err)
                            reject({
                                msg: "initPaymentGateway error",
                                status: 0
                            })
                        } else {
                            await OrderModel.updateOne(
                                {
                                    _id: order_id
                                },
                                {
                                    razorpay_order_id: order.id
                                }
                            )
                            resolve({
                                msg: "initPaymentGateway successfully",
                                status: 1,
                                // razorpay_id: order_id
                                order
                            })
                        }
                    });


                } catch (error) {
                    reject({
                        msg: "initPaymentGateway error",
                        status: 0
                    })
                }
            }
        )
    }

    getOrder() {
        return new Promise(async (resolve, reject) => {
            try {
                const order = await OrderModel.find().populate(['product_details.product_id', 'user_id'])
                if (order) {
                    resolve({
                        msg: "Order Found",
                        status: 1,
                        order
                    })
                } else {
                    reject(
                        {
                            msg: "Order did'n found",
                            status: 0
                        }
                    )
                }
            } catch (error) {
                reject(
                    {
                        msg: "Internal server error",
                        status: 0
                    }
                )
            }
        })
    }
}

module.exports = OrderController