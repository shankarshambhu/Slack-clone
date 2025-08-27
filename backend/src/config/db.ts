import mongoose from "mongoose";
import 'dotenv/config';
const url = process.env.MONGO_URI!;
export const connectDb = async () => {
    try {
        await mongoose.connect(url);
        console.log('DB connected ');


    } catch (error) {
        console.log('error connecting to db ', error);


    }

}
