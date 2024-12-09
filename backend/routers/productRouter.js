const express = require("express");
const productRouter = express.Router();
const productControllers = require('../controllers/productControllers')
const fileupload = require("express-fileupload")


productRouter.post(
    '/create',
    fileupload(
        {
            createParentPath: true
        }
    )
    ,
    (req, res) => {
        // console.log(req.body.colors)
        // return
        const result = new productControllers().createProduct(req.body, req.files?.main_image)
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

productRouter.post(
    '/otherimages/:id',
    fileupload(
        {
            createParentPath: true
        }
    )
    ,
    (req, res) => {
        // console.log(req.files)
        // return
        const result = new productControllers().AddOtherImages(req.params.id, req.files?.others_images)
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

productRouter.get(
    '/:id?',
    (req, res) => {
        const result = new productControllers().getProduct(req.params.id,req.query)
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

productRouter.patch(
    "/updatestatus/:id/:flag",
     (req, res) => {
    // console.log(req.params.flag)
    // return
    const result = new productControllers().productStatusUpdate(req.params.id, req.params.flag)
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
);

productRouter.put(
    "/update/:id",
    fileupload(
        {
            createParentPath: true
        }
    )
    ,
    (req, res) => {
        const result = new productControllers().productupdate(req.params.id, req.body, req.files?.main_image)
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
);

productRouter.delete(
    "/delete/:id",
     (req, res) => {
    const result = new productControllers().productdelete(req.params.id)
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
);

module.exports = productRouter;