import mongoose from 'mongoose';
// import { Pool } from 'pg';

export const connectDB = async (): Promise< void> => {
    try {
        // MongoDB Connection
        await mongoose.connect("mongodb+srv://kdev-ubuntu:kichu123@cluster0.wc88p.mongodb.net/dropify?retryWrites=true&w=majority&appName=Cluster0");
        console.log('MongoDB connected');

        // PostgreSQL Connection
        // const pool = new Pool({
        //     user: process.env.PG_USER,
        //     host: process.env.PG_HOST,
        //     database: process.env.PG_DATABASE,
        //     password: process.env.PG_PASSWORD,
        //     port: parseInt(process.env.PG_PORT as string, 10),
        // });
        // console.log('PostgreSQL connected');
        // return pool;
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
};
