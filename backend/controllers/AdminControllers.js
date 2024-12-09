const { encryptedPassword, decrypedPassword, adminToken } = require('../Help')
const AdminModel = require('../models/AdminModel')

class adminControllers {

    register(data) {
        return new Promise(
            async (resolve, reject) => {
                try {

                    if (!data.name || !data.email || !data.contact || !data.password) {
                        reject(
                            {
                                msg: "All Filed Require",
                                status: 0
                            }
                        )
                    }

                    const admin = await AdminModel.findOne({ email: data.email })
                    if (admin) {
                        reject(
                            {
                                msg: "Email Already Exits",
                                status: 0
                            }
                        )
                    }
                    else {
                        const adminData = new AdminModel(
                            {
                                ...data,
                                password: encryptedPassword(data.password)
                            }
                        )
                        await adminData.save()
                            .then(
                                () => {
                                    resolve(
                                        {
                                            msg: "Admin Create",
                                            status: 1
                                        }
                                    )
                                }
                            ).catch(
                                (err) => {
                                    console.log(err)
                                    reject(
                                        {
                                            msg: "Unable to create Admin",
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

    login(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const admin = await AdminModel.findOne({ email: data.email })
                    if (admin) {
                        if (data.password == decrypedPassword(admin.password)) {
                            resolve(
                                {
                                    msg: "Login Successfully",
                                    status: 1,
                                    admin: {
                                        ...admin.toJSON(), password: null
                                    },
                                    token: adminToken(admin.toJSON())
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

    adminupdate(data, id) {
        return new Promise(async (resolve, reject) => {
            try {
                const admin = await AdminModel.findOne({ _id: id });

                if (admin) {
                    AdminModel.updateOne(
                        { _id: id },
                        {
                            ...data
                        }
                    ).then(
                        () => {
                            resolve({
                                "msg": "Admin updated",
                                "status": 1,
                                admin
                            });
                        }
                    )
                        .catch(
                            () => {
                                reject({
                                    "msg": "Unable to update Admin",
                                    "status": 0
                                });
                            }
                        )


                } else {
                    reject({
                        "msg": "Admin didn't find",
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

    getAdmin(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let admin;
                if (id) {
                    admin = await AdminModel.findOne({ _id: id });

                    if (admin) {
                        resolve({
                            msg: "Admin found",
                            status: 1,
                            admin
                        });
                    } else {
                        reject({
                            msg: "Admin not found",
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
}

module.exports = adminControllers;