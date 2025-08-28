import express from 'express';
import 'dotenv/config';
import { connectDb } from './config/db';
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from './config/inngest';
import bodyParser from 'body-parser';



const app = express();
app.use(clerkMiddleware());
app.use(express.json());
app.use(bodyParser.json());


const PORT = process.env.PORT;

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get('/', (req, res) => {
    res.send('hello world ');

})

const startServer = async () => {
    try {
        await connectDb();

        if (process.env.NODE_ENV !== "production") {
            // Only needed when running locally
            app.listen(PORT, () => {
                console.log(`Server running on http://localhost:${PORT}`);
            });
        }

    } catch (error) {
        console.error("Failed to connect to DB", error);
        process.exit(1);
    }
};

startServer();

export default app; // Vercel/Serverless platforms use this



