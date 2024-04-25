import mongoose from 'mongoose'

const connectToMondoDB=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        
    } catch (error) {
        console.log("error connecting Database");
    }
}
export default connectToMondoDB;