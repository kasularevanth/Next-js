import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://kasularevanth1:g2jnV9aXk*xvbR8@cluster0.teaocpm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}



async function connectToDatabase() {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
}

export default connectToDatabase;
