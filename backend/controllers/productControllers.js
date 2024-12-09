const ProductModel = require('../models/productModel')
const CategoryModel = require('../models/caregoryModel')
const { generatedcategoryImageName } = require('../Help')
const { unlinkSync } = require('fs')
const fs = require("fs");
const { json } = require("express")

class productControllers {

    createProduct(data, product_image) {
        return new Promise(
            (resolve, reject) => {
                try {
                    if (!data.name || !data.slug || !product_image || !data.original_price || !data.final_price || !data.discounted_price) {
                        return reject(
                            {
                                msg: 'All Filed Required',
                                status: 0
                            }
                        )
                    }

                    const product_img = generatedcategoryImageName(product_image.name)
                    const destination = './public/images/product/' + product_img
                    product_image.mv(
                        destination,
                        (err) => {
                            if (err) {
                                reject(
                                    {
                                        msg: "Unable to Upload a file",
                                        status: 0
                                    }
                                )

                            } else {

                                const product = new ProductModel(
                                    {
                                        ...data,
                                        colors: JSON.parse(data.colors),
                                        main_image: product_img

                                    }
                                )
                                product.save()
                                    .then(
                                        () => {
                                            resolve(
                                                {
                                                    msg: "product Create",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        () => {
                                            reject(
                                                {
                                                    msg: "Unable to create product",
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

    getProduct(id, query) {
        // console.log(query.category_slug)
        return new Promise(async (resolve, reject) => {
            try {
                const filterquery = {};
                if (query.category_slug != null) {
                    const category = await CategoryModel.findOne({ slug: query.category_slug })
                    filterquery["category_id"] = category._id
                }

                if (query.product_color != null) {
                    filterquery["colors"] = query.product_color
                }


                let product;
                if (id) {
                    // Fetch a specific category by ID
                    product = await ProductModel.findOne({ _id: id });

                    if (product) {
                        resolve({
                            msg: "product found",
                            status: 1,
                            product
                        });
                    } else {
                        reject({
                            msg: "product not found",
                            status: 0
                        });
                    }
                } else {
                    product = await ProductModel.find(filterquery).populate(["category_id", "colors"]).limit(query.limit || 0);

                    if (product.length > 0) {
                        resolve({
                            msg: "products found",
                            status: 1,
                            product
                        });
                    } else {
                        reject({
                            msg: "No products found",
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

    productStatusUpdate(id, flag) {
        return new Promise(async (resolve, reject) => {
            try {
                const productstatus = {}
                const product = await ProductModel.findById(id);
                if (flag == 1) {
                    productstatus.status = !product.status
                } else if (flag == 2) {
                    productstatus.stock = !product.stock
                } else if (flag == 3) {
                    productstatus.top_selling = !product.top_selling

                }
                if (product) {
                    ProductModel.updateOne(
                        { _id: id },
                        {
                            $set: productstatus
                        }
                    ).then(
                        () => {
                            resolve({
                                "msg": "product status update successfully",
                                "status": 1,
                                product
                            });
                        }
                    )
                        .catch(
                            () => {
                                reject({
                                    "msg": "Unable to Update product Status",
                                    "status": 0
                                });
                            }
                        )


                } else {
                    reject({
                        "msg": "product didn't find",
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

    productdelete(id) {
        return new Promise((resolve, reject) => {
            ProductModel.findOne({ _id: id })
                .then((product) => {
                    if (product) {
                        return ProductModel.deleteOne({ _id: id })
                            .then(() => {
                                fs.unlinkSync("./public/images/product/" + product.main_image);
                            });
                    } else {
                        reject({
                            msg: "product not found",
                            status: 0
                        });
                    }
                })
                .then(() => {
                    resolve({
                        msg: "product deleted",
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

    productupdate(id, data, file) {
        return new Promise(async (resolve, reject) => {
            const product = await ProductModel.findById(id);
            try {
                if (file) {
                    console.log(file)
                    const product_img = generatedcategoryImageName(file.name);
                    const destination = "./public/images/product/" + product_img
                    file.mv(
                        destination,
                        async (err) => {
                            if (err) {
                                reject(
                                    {
                                        msg: "Unable to Update a file",
                                        status: 0
                                    }
                                )

                            } else {
                                // unlinkSync("./public/images/product/" + product.main_image)
                                ProductModel.updateOne(
                                    {
                                        _id: id
                                    },
                                    {
                                        $set: {
                                            ...data,
                                            colors: JSON.parse(data.colors),
                                            main_image: product_img
                                        }
                                    }
                                ).then(
                                    () => {
                                        resolve(
                                            {
                                                msg: "Product image Updated",
                                                status: 1
                                            }
                                        )
                                    }

                                ).catch(
                                    () => {
                                        reject(
                                            {
                                                msg: "Unable to Update Product ",
                                                status: 0
                                            }
                                        )
                                    }

                                )

                            }
                        }

                    )


                } else {
                    ProductModel.updateOne(
                        {
                            _id: id
                        },
                        {
                            $set: {
                                ...data,
                                main_image: product.main_image,
                                colors: JSON.parse(data.colors),
                            }
                        }
                    ).then(
                        () => {
                            resolve(
                                {
                                    msg: "Product Updated",
                                    status: 1
                                }
                            )
                        }

                    ).catch(
                        () => {
                            reject(
                                {
                                    msg: "Unable to Update Product ",
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

    AddOtherImages(id, others_images) {
        // console.log(others_images)
        return new Promise(
            async (resolve, reject) => {
                try {
                    if (!others_images) {
                        return reject(
                            {
                                msg: 'All Filed Required',
                                status: 0
                            }
                        )
                    }

                    const product = await ProductModel.findById(id);

                    if (product) {
                        let currentImg = product.others_images ?? [];

                        others_images = Array.isArray(others_images) ? others_images : [others_images];

                        let allPromise = []
                        for (let images of others_images) {
                            const others_img = generatedcategoryImageName(images.name)
                            const destination = './public/images/product/' + others_img
                            currentImg.push(others_img);
                            allPromise.push(images.mv(destination))
                        }
                        // console.log(currentImg)
                        Promise.all(allPromise)
                        ProductModel.updateOne(
                            {
                                _id: id
                            },
                            {
                                $set: {
                                    others_images: currentImg
                                }
                            }
                        ).then(
                            () => {
                                resolve(
                                    {
                                        msg: "Product image Add",
                                        status: 1
                                    }
                                )
                            }

                        ).catch(
                            () => {
                                reject(
                                    {
                                        msg: "Unable to Add Product Images",
                                        status: 0
                                    }
                                )
                            }

                        )


                    } else {
                        reject({
                            'msg': "Product not found",
                            'status': 0,
                            "error": error.message
                        })
                    }

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
}

module.exports = productControllers;