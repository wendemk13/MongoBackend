import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();


const databaseConnect = async () => {
    try {
        mongoose.connect(process.env.MongoDBApi);
        console.log("Database connected to ", process.env.MongoDBApi);
    } catch (error) {
        console.log("database connecting error ", error)
    }
}


export default databaseConnect;