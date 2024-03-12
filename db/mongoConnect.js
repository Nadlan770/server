const { configs } = require("../configs/secrets");

// 

const mongoose = require('mongoose');

// // Connect to MongoDB
// mongoose.connect(configs.db_local_url);

// // Get the default connection
// const db = mongoose.connection;

// // Event listeners
// db.on('connected', () => {
//     console.log('Connected to MongoDB');
// });

// db.on('error', (err) => {
//     console.error('MongoDB connection error:', err);
// });

// db.on('disconnected', () => {
//     console.log('Disconnected from MongoDB');
// });


main().catch(err => console.log(err));

async function main() {
    // to ignore the warning in the terminal
    mongoose.set('strictQuery', false);
    // for windows 11
    await mongoose.connect(configs.db_local_url);
    console.log("mongo connect Nadlan770!");
}
// const mongoose = require("mongoose");

// const californiaSchema = new mongoose.Schema({
//     longitude: String,
//     latitude: String,
//     median_house_value: String

// })
// californiaModel = mongoose.model("california", californiaSchema);
// console.log(californiaModel + "45");
// module.exports = californiaModel;