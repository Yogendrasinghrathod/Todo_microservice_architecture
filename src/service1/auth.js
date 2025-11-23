const bcrypt = require("bcrypt");
const User = require("./userModel");
const jwt = require("jsonwebtoken");

const registerController = async (userData) => {
	// Validate input data
	if (!userData || !userData.email || !userData.password) {
		return {
			success: false,
			message: "Username and password are required",
		};
	}

	// Check if username already exists
	const existingUser = await User.findOne({
		email: userData.email,
	});
	if (existingUser) {
		return { success: false, message: "Username already exists" };
	}

	// Hash password
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

	// Create user document
	const newUser = new User({
		email: userData.email,
		password: hashedPassword,
	});

	await newUser.save();

	return { success: true, message: "Registration successful" };
};

const loginController = async (userData) => {
	if (!userData || !userData.email || !userData.password) {
		return {
			success: false,
			message: "Email and password are required",
		};
	}

	const user = await User.findOne({ email: userData.email });
	if (!user) {
		return {
			success: false,
			message: "Invalid email or password",
		};
	}

	const passwordMatch = await bcrypt.compare(
		userData.password,
		user.password
	);
	if (!passwordMatch) {
		return {
			success: false,
			message: "Invalid email or password",
		};
	}

	const token = jwt.sign({ userId: user._id }, "YogiGi", {
		expiresIn: "1d",
	});

	return {
		success: true,
		message: "Login successful",
		userId: user._id,
		token,
	};
};
const logoutController = async (ctx) => {
	try {
		ctx.meta.$responseHeaders = {
			"Set-Cookie": `token=; HttpOnly; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
		};
		return {
			success: true,
			message: "Logout successful!",
		};
	} catch (error) {
		return {
			success: false,
			message: "Logout failed",
		};
	}
};

module.exports = { registerController, loginController, logoutController };
