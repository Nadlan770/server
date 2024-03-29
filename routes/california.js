const experss = require("express");
// const mongoose = require("../db/mongoConnect");
const { CaliforniaModel } = require("../models/californiaModel")
const router = experss.Router();
//get california

//funck for change the name lat lon price
function renameKey(obj, oldKey, newKey) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
}


//rout bring longitude latitude median_house_value
router.get("/californiaList", async (req, res) => {
    let perPage = Math.min(req.query.perPage, 20) || 2000;
    let page = req.query.page - 1 || 0;
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? 1 : -1;
    try {
        let data = await CaliforniaModel.find({
            //  longitude: "lat", latitude: "lat", median_house_value: "price"
        })
            .select("longitude latitude median_house_value")
            // limiting the pages by default 5 and adding /?perPage=20  will show until 20 //http://localhost:3002/places/?perPage=1
            .limit(perPage)
            //skiping how many records to skip
            .skip(page * perPage)
            //sorting from small to big 1 , from big to small -1 // http://localhost:3002/places/?sort=score&reverse=yes
            .sort({ [sort]: reverse })

        //change name to lat lon price
        let jsonString = JSON.stringify(data);

        const arr = JSON.parse(jsonString);
        arr.forEach(data => renameKey(data, 'longitude', 'lng'));
        arr.forEach(data => renameKey(data, 'latitude', 'lat'));
        arr.forEach(data => renameKey(data, 'median_house_value', 'price'));

        // console.log(arr);
        res.json(arr);
    }
    catch (err) {
        console.log(err);
    }

})



//rout bring population ocean_proximity households
router.get("/californiaOtherList", async (req, res) => {
    let perPage = Math.min(req.query.perPage, 20) || 2000;
    let page = req.query.page - 1 || 0;
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? 1 : -1;
    try {
        let data = await CaliforniaModel.find({
            //  longitude: "lat", latitude: "lat", median_house_value: "price"
        })
            .select("population ocean_proximity households")
            // limiting the pages by default 5 and adding /?perPage=20  will show until 20 //http://localhost:3002/places/?perPage=1
            .limit(perPage)
            //skiping how many records to skip
            .skip(page * perPage)
            //sorting from small to big 1 , from big to small -1 // http://localhost:3002/places/?sort=score&reverse=yes
            .sort({ [sort]: reverse })

        // console.log(data);
        res.json(data);
    }
    catch (err) {
        console.log(err);
    }

})

//rout bring full list
router.get("/californiaFullList", async (req, res) => {
    let perPage = Math.min(req.query.perPage, 20) || 2000;
    let page = req.query.page - 1 || 0;
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? 1 : -1;
    try {
        let data = await CaliforniaModel.find({
            //  longitude: "lat", latitude: "lat", median_house_value: "price"
        })
            // .select("population ocean_proximity households")
            // limiting the pages by default 5 and adding /?perPage=20  will show until 20 //http://localhost:3002/places/?perPage=1
            .limit(perPage)
            //skiping how many records to skip
            .skip(page * perPage)
            //sorting from small to big 1 , from big to small -1 // http://localhost:3002/places/?sort=score&reverse=yes
            .sort({ [sort]: reverse })

        // console.log(data);
        res.json(data);
    }
    catch (err) {
        console.log(err);
    }

})

// router.get("/", async (req, res) => {
//     res.json({ msg: "california working" })
// })



module.exports = router;