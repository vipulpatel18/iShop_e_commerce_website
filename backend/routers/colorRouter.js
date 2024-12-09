const express = require("express");
const colorRouter = express.Router();
const colorControllers = require('../controllers/colorControllers')

colorRouter.post(
    '/create',
    (req, res) => {
        // console.log(req.body)
        const result = new colorControllers().createColor(req.body)
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

colorRouter.get(
    '/:id?',
    (req, res) => {
        const result = new colorControllers().getColor(req.params.id)
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

colorRouter.patch("/updatestatus/:id", (req, res) => {
    const result = new colorControllers().colorStatusUpdate(req.params.id)
    result.then(
        (responce)=>{
            res.send(responce)
        }
       )
       .catch(
        (error)=>{
            res.send(error)
        }
       )
});

colorRouter.put("/update/:id", async (req, res) => {
    const result = new colorControllers().colorupdate(req.body,req.params.id)
    result.then(
        (responce)=>{
            res.send(responce)

        }
       )
       .catch(
        (error)=>{
            res.send(error)
        }
       )
});

colorRouter.delete("/delete/:id", (req, res) => {
    const result = new colorControllers().colordelete(req.params.id)
    result.then(
        (responce)=>{
            res.send(responce)
        }
       )
       .catch(
        (error)=>{
            res.send(error)
        }
       )
});

module.exports = colorRouter;