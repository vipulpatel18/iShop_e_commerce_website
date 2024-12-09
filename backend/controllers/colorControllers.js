const ColorModel = require('../models/colorModel')

class colorControllers {

    createColor(data) {
        return new Promise(
            async (resolve, reject) => {
                try {

                    if (!data.name || !data.colorCode) {
                        return reject(
                            {
                                msg: 'All Filed Required',
                                status: 0
                            }
                        )

                    }

                    const color = new ColorModel(
                        {
                            ...data

                        }
                    )
                    await color.save()
                        .then(
                            () => {
                                resolve(
                                    {
                                        msg: "color Create",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            () => {
                                reject(
                                    {
                                        msg: "Unable to create color",
                                        status: 0
                                    }
                                )
                            }
                        )

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


    getColor(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let color;
                if (id) {
                    // Fetch a specific category by ID
                    color = await ColorModel.findOne({ _id: id });

                    if (color) {
                        resolve({
                            msg: "color found",
                            status: 1,
                            color
                        });
                    } else {
                        reject({
                            msg: "color not found",
                            status: 0
                        });
                    }
                } else {
                    // Fetch all categories if no ID is provided
                    color = await ColorModel.find();

                    if (color.length > 0) {
                        resolve({
                            msg: "colors found",
                            status: 1,
                            color
                        });
                    } else {
                        reject({
                            msg: "No colors found",
                            status: 0
                        });
                    }
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


    colorStatusUpdate(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const color = await ColorModel.findOne({ _id: id });

                if (color) {
                    ColorModel.updateOne(
                        { _id: id },
                        {
                            "status": !color.status
                        }
                    ).then(
                        () => {
                            resolve({
                                "msg": "color status update successfully",
                                "status": 1,
                                color
                            });
                        }
                    )
                        .catch(
                            () => {
                                reject({
                                    "msg": "Unable to Update color Status",
                                    "status": 0
                                });
                            }
                        )


                } else {
                    reject({
                        "msg": "color didn't find",
                        "status": 0
                    });
                }

            } catch (error) {
                reject({
                    "msg": "Internal Server Error",
                    "status": 0,
                    "error": error.message
                });
            }
        });
    }

    colordelete(id) {
        return new Promise((resolve, reject) => {
            ColorModel.findOne({ _id: id })
                .then((color) => {
                    if (color) {
                        return ColorModel.deleteOne({ _id: id });
                    } else {
                        reject({
                            msg: "Color not found",
                            status: 0
                        });
                    }
                })
                .then(() => {
                    resolve({
                        msg: "Color deleted",
                        status: 1
                    });
                })
                .catch((error) => {
                    reject({
                        msg: "Internal Server Error",
                        status: 0,
                        error: error.message
                    });
                });
        });
    }

    colorupdate(data, id) {
        return new Promise(async (resolve, reject) => {
            try {
                const color = await ColorModel.findOne({ _id: id });

                if (color) {
                    ColorModel.updateOne(
                        { _id: id },
                        {
                            ...data
                        }
                    ).then(
                        () => {
                            resolve({
                                "msg": "Color updated",
                                "status": 1,
                                color
                            });
                        }
                    )
                        .catch(
                            () => {
                                reject({
                                    "msg": "Color not updated",
                                    "status": 0
                                });
                            }
                        )


                } else {
                    reject({
                        "msg": "Color didn't find",
                        "status": 0
                    });
                }

            } catch (error) {
                // console.log(error);
                reject({
                    "msg": "Interval Server Error",
                    "status": 0,
                    "error": error.message
                });
            }
        });
    }
}

module.exports = colorControllers;