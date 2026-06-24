import mongoose from "mongoose";
import dns from "dns";

// Fix for "querySrv ECONNREFUSED" on certain networks (e.g., Reliance Jio)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("Database connected"))
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.error("Database connection failed :", error.message)
    }
}

export default connectDB