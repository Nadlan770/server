const express = require("express");

const path = require("path");

const http = require("http");

const cors = require("cors");

const fileUpload = require("express-fileupload");

const { routesInit } = require("./routes/configRoutes");
const { log } = require("console");

//for mongo
// require("./db/mongoConnect");


// connect to sql
require("./db/sqlConnect");

//created the sql table
require("./routes/sqlRoutes");

const app = express();
app.use(cors());


app.use(fileUpload({
    limits: { fileSize: 1024 * 1024 * 5 }
}))

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

routesInit(app);

const server = http.createServer(app);
let port = process.env.PORT || 3002;
server.listen(port);
console.log("listing at port" + port);
