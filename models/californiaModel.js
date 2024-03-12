const mongoose = require("mongoose");
const joi = require("joi");

const californiaSchema = new mongoose.Schema({
    longitude: String,
    latitude: String,
    median_house_value: String

})

exports.CaliforniaModel = mongoose.model("californias", californiaSchema);

exports.validateCalifornia = (_reqBody) => {
    let joiSchema = Joi.object({
        longitude: Joi.string().min(1).max(150).required(),
        latitude: Joi.string().min(1).max(150).required(),
        median_house_value: Joi.string().min(1).max(150).required(),

    })
    return joiSchema.validate(_reqBody);
}