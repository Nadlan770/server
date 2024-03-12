const usersR = require("./users");
const californiaR = require("./california");

exports.routesInit = (app) => {
    app.use("/users", usersR);
    app.use("/california", californiaR);
}