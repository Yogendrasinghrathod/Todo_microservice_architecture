
const connectDB = require("../src/service1/db");
const { isAuthenticated } = require("../src/todo/middleware/isAuthenticated.js");
const {
	createTodo,
	getAllTodos,
	updateTodo,
	deleteTodo,
} = require("../src/todo/todoController");

module.exports = {
	name: "todo",

	methods: {
		createTodoMethod: createTodo,
		getAllTodosMethod: getAllTodos,
		updateTodoMethod: updateTodo,
		deleteTodoMethod: deleteTodo,
	},

	actions: {
		create: {
			rest: { method: "POST", path: "/" },
			before:isAuthenticated,
			async handler(ctx) {
				return await this.createTodoMethod(ctx.params);
			},
		},
		getAll: {
			rest: { method: "GET", path: "/" },
			async handler(ctx) {
				return await this.getAllTodosMethod();
			},
		},
		update: {
			rest: { method: "PUT", path: "/:todoId" },
			before:isAuthenticated,
			async handler(ctx) {
				// Merge path parameter todoId and body params
				return await this.updateTodoMethod({
					...ctx.params,
					todoId: ctx.params.todoId,
				});
			},
		},
		delete: {
			rest: { method: "DELETE", path: "/:todoId" },
			before:isAuthenticated,
			async handler(ctx) {
				return await this.deleteTodoMethod({
					todoId: ctx.params.todoId,
				});
			},
		},
	},

	created() {
		connectDB();
	},

	started() {

	},

	stopped() {
	},
};
