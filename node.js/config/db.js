import mongoose from "mongoose";
export const connectDB = async()=>{
    try{
        await mongoose.connect(DB_URI)
    }catch(error){
        console.log(`Error connecting to DB: ${error.message}`);
        process.exit(1);
    }
}