const jwt = require("jsonwebtoken");

const isAuthenticated = async (ctx) => {
	const cookieHeader = ctx.meta.$originalReq.headers.cookie;
	if (!cookieHeader) {
		throw new Error("Token not found");
	}

	const cookies = Object.fromEntries(
		cookieHeader.split(";").map((c) => {
			const [key, v] = c.trim().split("=");
			return [key, decodeURIComponent(v)];
		})
	);

	const token = cookies.token;
	if (!token) throw new Error("Token not found");

	const decoded = jwt.verify(token, "YogiGi");
	if (!decoded) throw new Error("Unauthorized access");

	ctx.meta.userId = decoded.userId;
};

module.exports = { isAuthenticated };
