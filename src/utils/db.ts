import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoConnect = async () => {
  // Connect to MongoDB
  try {
    if(process.env.MONGO_URL) {
     const connection = await mongoose.connect(process.env.MONGO_URL);
     console.log('MongoDB Connected');
     return connection;
    }
    throw new Error('MONGO_URL not found');

  }catch (error) {
    console.error('Connection to db failed: ', (error as Error).message);
  }
  
};

export default mongoConnect;
