const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://YogendraSinghRathod:1234@cluster0.gou51gn.mongodb.net/";

async function connectDB() {
	if (mongoose.connection.readyState === 1) {
		// Already connected
		return mongoose;
	}
	try {
		await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB connected successfully via Mongoose");
		return mongoose;
	} catch (error) {
		console.error("MongoDB connection error:", error);
		throw error;
	}
}

module.exports = connectDB;
