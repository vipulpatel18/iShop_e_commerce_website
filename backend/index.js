require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const categoryRouter = require('./routers/categoryRouter');
const colorRouter = require('./routers/colorRouter');
const productRouter = require('./routers/productRouter');
const AdminRouter = require('./routers/AdminRouter');
const UserRouter = require('./routers/UserRouter');
const OrderRouter = require('./routers/OrderRouter');
const server = express();
server.use(express.json());
server.use(express.static("public"))

server.use(
    cors(
        {
            // origin: ["http://localhost:5173"],
            origin: "*"
        }
    )
)

server.use("/category", categoryRouter)
server.use("/color", colorRouter)
server.use("/product", productRouter)
server.use("/admin", AdminRouter)
server.use("/user", UserRouter)
server.use("/order", OrderRouter)

const MongoDb_Url = process.env.MONGODB_URL

mongoose.connect(MongoDb_Url,
    {
        dbName: 'iShop'
    }
).then(
    () => {
        server.listen(process.env.PORT || 5000, () => {
            console.log('Server started on port 5000');
        });
    }
)
    .catch(
        (error) => {
            console.log('Internal server error:', error.message);
        }
    );

