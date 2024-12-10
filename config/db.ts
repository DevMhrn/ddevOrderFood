import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

// Ensure DATABASE_URL is set
if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set. Please set this environment variable.');
    process.exit(1);
  }
  
  // Connect to the database
  const connectToDatabase = async (): Promise<void> => {
    try {
      await mongoose.connect(process.env.DATABASE_URL as string,{}  as mongoose.ConnectOptions);
      console.log('Connection Successful');
    } catch (err) {
      console.error('Connection unsuccessful', err);
    }
  };
  
  connectToDatabase();
