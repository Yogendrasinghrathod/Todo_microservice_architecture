//name export

// const bcrypt = require("bcrypt");

const connectDB = require("../src/service1/db");
// const User = require("../src/service1/userModel");
const {
	registerController,
	loginController,
	logoutController,
} = require("../src/service1/auth");

module.exports = {
	name: "auth",

	methods: {
		registerUser: registerController,
		loginUser: loginController,
	},
	actions: {
		register: {
			rest: {
				method: "POST",
				path: "/register",
			},
			async handler(ctx) {
				const userData = ctx.params;
				const res = await module.exports.methods.registerUser(userData);
				return res;
			},
		},
		login: {
			rest: {
				method: "POST",
				path: "/login",
			},
			async handler(ctx) {
				const result = await loginController(ctx.params);
				if (result.success) {
					// If your framework supports sending headers or cookies, do it here
					ctx.meta.$responseHeaders = {
						"Set-Cookie": `token=${
							result.token
						}; HttpOnly; SameSite=Strict; Max-Age=${24 * 60 * 60}`,
					};
				}
				return result;
			},
		},
		logout: {
			rest: {
				method: "POST",
				path: "/logout",
			},
			async handler(ctx) {
				return await logoutController(ctx);
			},
		},
	},

	created: () => {
		connectDB();
	},
	started: async () => {},
	stopped: async () => {},
};
