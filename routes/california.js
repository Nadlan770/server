const experss = require("express");
// const mongoose = require("../db/mongoConnect");
const { CaliforniaModel } = require("../models/californiaModel")
const router = experss.Router();
//get california

router.get("/californiaList", async (req, res) => {
    let perPage = Math.min(req.query.perPage, 20) || 5;
    let page = req.query.page - 1 || 0;
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? 1 : -1
    ;
    try {
        let data = await CaliforniaModel.find({})

            // limiting the pages by default 5 and adding /?perPage=20  will show until 20 //http://localhost:3002/places/?perPage=1
            .limit(perPage)
            //skiping how many records to skip
            .skip(page * perPage)
            //sorting from small to big 1 , from big to small -1 // http://localhost:3002/places/?sort=score&reverse=yes
            .sort({ [sort]: reverse })
        res.json(data);
        console.log(data);
    }
    catch (err) {
        console.log(err);
    }



})

// router.get("/", async (req, res) => {
//     res.json({ msg: "california working" })
// })



module.exports = router;