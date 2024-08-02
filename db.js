const mongoose = require("mongoose");

const database = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URI).then(
        (data) => {
            console.log(`Connected with server Successfully on the host: ${data.connection.host}`);
        }
    ).catch((err) => {
        console.error("Database connection error:", err);
    });
}

module.exports = database;