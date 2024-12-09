const { encryptedPassword, decrypedPassword, adminToken } = require('../Help')
const cartModel = require('../models/cartModel')
const UserModel = require('../models/UserModel')

class userControllers {

    register(data) {
        return new Promise(
            async (resolve, reject) => {
                try {

                    if (!data.full_name || !data.email || !data.contact || !data.password) {
                        reject(
                            {
                                msg: "All Field Require",
                                status: 0
                            }
                        )
                    }

                    if (data.password != data.confirm_password) {
                        reject(
                            {
                                msg: "Password didn't match",
                                status: 0
                            }
                        )
                    }
                    const user = await UserModel.findOne({ email: data.email })
                    if (user) {
                        reject(
                            {
                                msg: "Email Already Exits",
                                status: 0
                            }
                        )
                    }
                    else {
                        const userData = new UserModel(
                            {
                                ...data,
                                password: encryptedPassword(data.password)
                            }
                        )
                        await userData.save()
                            .then(
                                () => {
                                    resolve(
                                        {
                                            msg: "user Create",
                                            status: 1,
                                            user: {
                                                ...userData.toJSON(), password: null
                                            },
                                            token: adminToken(userData.toJSON())
                                        }
                                    )
                                }
                            ).catch(
                                (err) => {
                                    console.log(err)
                                    reject(
                                        {
                                            msg: "Unable to create user",
                                            status: 0
                                        }
                                    )
                                }
                            )
                    }
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

    getUser(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let user;
                if (id) {
                    user = await UserModel.findOne({ _id: id });

                    if (user) {
                        resolve({
                            msg: "user found",
                            status: 1,
                            user: {
                                ...user.toJSON(), password: null
                            },
                            token: adminToken(user.toJSON())
                        });
                    } else {
                        reject({
                            msg: "user not found",
                            status: 0
                        });
                    }
                } else {
                    reject({
                        msg: "Id Not found",
                        status: 0
                    });
                }
            } catch (error) {
                reject({
                    msg: "Internal Server Error",
                    status: 0,
                    error: error.message
                });
            }
        });
    }

    login(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const user = await UserModel.findOne({ email: data.email })
                    if (user) {
                        if (data.password == decrypedPassword(user.password)) {
                            resolve(
                                {
                                    msg: "Login Successfully",
                                    status: 1,
                                    user: {
                                        ...user.toJSON(), password: null
                                    },
                                    token: adminToken(user.toJSON())
                                }
                            )
                        } else {
                            reject(
                                {
                                    msg: "Incorrect Password",
                                    status: 0
                                }
                            )
                        }
                    } else {
                        reject(
                            {
                                msg: "Email not exits",
                                status: 0
                            }
                        )
                    }
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

    userupdate(data, id) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findOne({ _id: id });

                if (user) {
                    UserModel.updateOne(
                        { _id: id },
                        {
                            ...data
                        }
                    ).then(
                        () => {
                            resolve({
                                "msg": "user updated",
                                "status": 1,
                                user
                            });
                        }
                    )
                        .catch(
                            () => {
                                reject({
                                    "msg": "Unable to update user",
                                    "status": 0
                                });
                            }
                        )


                } else {
                    reject({
                        "msg": "user didn't find",
                        "status": 0
                    });
                }

            } catch (error) {
                console.log(error);
                reject({
                    "msg": "Interval Server Error",
                    "status": 0,
                    "error": error.message
                });
            }
        });
    }

    addressUpdate(addressData, userId) {
        return new Promise(async (resolve, reject) => {
            try {
                // Find the user by ID
                const user = await UserModel.findById(userId);

                if (user) {
                    // Update the shipping address by appending to the existing array
                    user.ShippingAddress.push(addressData);

                    // Save the updated user document
                    await user.save();

                    resolve({
                        msg: "Address updated successfully",
                        status: 1,
                        user: {
                            ...user.toJSON(), password: null
                        },
                    });
                } else {
                    reject({
                        msg: "User not found",
                        status: 0,
                    });
                }
            } catch (error) {
                // console.error(error);
                reject({
                    msg: "Internal Server Error",
                    status: 0,
                    error: error.message,
                });
            }
        });
    }

    movetocart(user_id, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const cartData = data.cartData ? JSON.parse(data.cartData) : null;
                if (cartData) {
                    const allPromise = cartData.map(async (cd) => {
                        const product = await cartModel.findOne({
                            user_id: user_id,
                            product_id: cd.product_id
                        });

                        if (product) {
                            // Update the existing product's quantity
                            await cartModel.updateOne(
                                { user_id: user_id, product_id: cd.product_id },
                                { $inc: { quantity: Number(cd.quantity) } }
                            );
                        } else {
                            // Create a new cart item
                            await cartModel.create({
                                user_id,
                                product_id: cd.product_id,
                                quantity: Number(cd.quantity),
                            });
                        }
                    });

                    // Wait for all promises to resolve
                    await Promise.all(allPromise);

                    // Fetch the latest cart data
                    const latestCart = await cartModel.find({ user_id: user_id }).populate("product_id", "_id original_price final_price")
                    resolve({
                        msg: "Cart updated successfully",
                        status: 1,
                        latestCart,
                    });
                } else {
                    // Handle case where `cartData` is null
                    resolve({
                        msg: "No cart data provided",
                        status: 0,
                    });
                }
            } catch (error) {
                console.log(error);
                reject({
                    msg: "Internal Server Error",
                    status: 0,
                });
            }
        });
    }



}

module.exports = userControllers;