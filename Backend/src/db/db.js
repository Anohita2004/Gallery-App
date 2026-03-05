const mongoose = require('mongoose');

async function connectDB(){
    await mongoose.connect('mongodb+srv://anohita_db_user:SvtymbUjVSCebssr@cluster0.976qi6p.mongodb.net/app_db');
    console.log("Connected to MongoDB database");
}

module.exports = connectDB;