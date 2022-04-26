import mongoose from 'mongoose';

mongoose.connect(String(process.env.URL_MONGODB));

export default mongoose;
