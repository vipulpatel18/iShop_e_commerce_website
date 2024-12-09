const CategoryModel = require('../models/caregoryModel')
const ProductModel = require('../models/productModel')
const { generatedcategoryImageName } = require('../Help')
const { unlinkSync } = require('fs')
const fs = require('fs');

class categoryControllers {

    createCategory(data, category_image) {
        return new Promise(
            (resolve, reject) => {
                try {

                    if (!data.name || !data.slug || !category_image) {
                        return reject(
                            {
                                msg: 'All Filed Required',
                                status: 0
                            }
                        )

                    }
                    const category_img = generatedcategoryImageName(category_image.name)
                    const destination = './public/images/category/' + category_img
                    category_image.mv(
                        destination,
                        async (err) => {
                            if (err) {
                                reject(
                                    {
                                        msg: "Unable to Upload a file",
                                        status: 0
                                    }
                                )

                            } else {

                                const category = new CategoryModel(
                                    {
                                        ...data,
                                        img_name: category_img

                                    }
                                )
                                await category.save()
                                    .then(
                                        () => {
                                            resolve(
                                                {
                                                    msg: "Category Create",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        () => {
                                            reject(
                                                {
                                                    msg: "Unable to create category",
                                                    status: 0
                                                }
                                            )
                                        }
                                    )

                            }

                        }
                    )

                }
                catch (error) {
                    reject({
                        'msg': "Internal Server Error",
                        'status': 0,
                        "error": error.message
                    })
                }
            }
        )
    }

    async getCategory(id) {
        try {
            if (id) {
                // Fetch a single category by ID
                const category = await CategoryModel.findOne({ _id: id });
                if (category) {
                    return {
                        msg: "Category found",
                        status: 1,
                        category
                    };
                } else {
                    throw {
                        msg: "Category not found",
                        status: 0
                    };
                }
            } else {
                // Fetch all categories
                const categories = await CategoryModel.find();
                if (categories.length === 0) {
                    throw {
                        msg: "No categories found",
                        status: 0
                    };
                }
    
                // Add product count to each category
                const data = await Promise.all(
                    categories.map(async (cat) => {
                        const productCount = await ProductModel.countDocuments({ category_id: cat._id });
                        return {
                            ...cat.toObject(),
                            productCount
                        };
                    })
                );
    
                return {
                    msg: "Categories found",
                    status: 1,
                    category: data
                };
            }
        } catch (error) {
            console.error(error);
            return {
                msg: "Internal Server Error",
                status: 0,
                error: error.message || error.msg
            };
        }
    }
    
    categoryStatusUpdate(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const category = await CategoryModel.findOne({ _id: id });

                if (category) {
                    CategoryModel.updateOne(
                        { _id: id },
                        {
                            "status": !category.status
                        }
                    ).then(
                        () => {
                            resolve({
                                "msg": "Category status update successfully",
                                "status": 1,
                                category
                            });
                        }
                    )
                        .catch(
                            () => {
                                reject({
                                    "msg": "Unable to Update Status",
                                    "status": 0
                                });
                            }
                        )


                } else {
                    reject({
                        "msg": "category didn't find",
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

    categorydelete(id) {
        return new Promise((resolve, reject) => {
            CategoryModel.findOne({ _id: id })
                .then((category) => {
                    if (category) {
                        return CategoryModel.deleteOne({ _id: id })
                            .then(() => {
                                fs.unlinkSync("./public/images/category/" + category.img_name);
                            });
                    } else {
                        reject({
                            msg: "Category not found",
                            status: 0
                        });
                    }
                })
                .then(() => {
                    resolve({
                        msg: "Category deleted",
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

    categoryupdate(id, data, file) {
        return new Promise(async (resolve, reject) => {
            const category = await CategoryModel.findById(id);
            try {
                if (file != null) {
                    const image_name = generatedcategoryImageName(file.name);
                    const destination = "./public/images/category/" + image_name
                    file.mv(
                        destination,
                        (err) => {
                            if (err) {
                                reject(
                                    {
                                        msg: "Unable to Update a file",
                                        status: 0
                                    }
                                )

                            } else {
                                unlinkSync("./public/images/category/" + category.img_name)
                                CategoryModel.updateOne(
                                    {
                                        _id: id
                                    },
                                    {
                                        $set: {
                                            name: data.name,
                                            slug: data.slug,
                                            img_name: image_name
                                        }
                                    }
                                ).then(
                                    () => {
                                        resolve(
                                            {
                                                msg: "Category image Updated",
                                                status: 1
                                            }
                                        )
                                    }

                                ).catch(
                                    () => {
                                        reject(
                                            {
                                                msg: "Unable to Update Category ",
                                                status: 0
                                            }
                                        )
                                    }

                                )

                            }
                        }

                    )


                } else {
                    CategoryModel.updateOne(
                        {
                            _id: id
                        },
                        {
                            $set: {
                                name: data.name,
                                slug: data.slug
                            }
                        }
                    ).then(
                        () => {
                            resolve(
                                {
                                    msg: "Category Updated",
                                    status: 1
                                }
                            )
                        }

                    ).catch(
                        () => {
                            reject(
                                {
                                    msg: "Unable to Update Category ",
                                    status: 0
                                }
                            )
                        }

                    )


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

module.exports = categoryControllers;