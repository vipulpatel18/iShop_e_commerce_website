const express = require("express");
const categoryRouter = express.Router();
const categoryControllers = require('../controllers/categoryControllers')
const fileupload = require("express-fileupload");
const authAdmin = require("../Middlerwire/authAdmin");

categoryRouter.post(
    '/create',
    [
        fileupload(
            {
                createParentPath: true
            }
        ),
        authAdmin
    ]
    ,
    (req, res) => {
        // console.log(req.body)
        // console.log(req.files?.img_name)
        // return
        const result = new categoryControllers().createCategory(req.body, req.files?.img_name)
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

categoryRouter.get(
    '/:id?',
    (req, res) => {
        const result = new categoryControllers().getCategory(req.params.id)
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

categoryRouter.patch("/updatestatus/:id", (req, res) => {
    const result = new categoryControllers().categoryStatusUpdate(req.params.id)
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

categoryRouter.put("/update/:id",
    fileupload(
        {
            createParentPath: true
        }
    )
    ,
    (req, res) => {
        const result = new categoryControllers().categoryupdate(req.params.id, req.body, req.files?.img_name)
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

categoryRouter.delete("/delete/:id", (req, res) => {
    const result = new categoryControllers().categorydelete(req.params.id)
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

module.exports = categoryRouter;