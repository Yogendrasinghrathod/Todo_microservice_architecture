const Todo = require("./todoModel");

const createTodo = async (params) => {
	try {
		const { title, description } = params;

		if (!title || !description) {
			throw new Error(
				"Incomplete todo data: title and description required"
			);
		}

		const todo = new Todo({ title, description });
		await todo.save();

		return {
			status: true,
			message: "Todo Created",
			todo,
		};
	} catch (err) {
		throw new Error(`Failed to create todo: ${err.message}`);
	}
};

const getAllTodos = async () => {
	try {
		const todos = await Todo.find();

		return {
			status: "success",
			todos,
		};
	} catch (err) {
		throw new Error(`Failed to get todos: ${err.message}`);
	}
};

const updateTodo = async (params) => {
	try {
		const { todoId, title, description } = params;
		if (!todoId) {
			throw new Error("todoId is required");
		}

		const updateData = {};
		if (title) updateData.title = title;
		if (description) updateData.description = description;

		const todo = await Todo.findByIdAndUpdate(todoId, updateData, {
			new: true,
		});
		if (!todo) throw new Error("Todo not found");

		return {
			status: true,
			todo,
			message: "Updated Todo",
		};
	} catch (err) {
		throw new Error(`Failed to update todo: ${err.message}`);
	}
};

const deleteTodo = async (params) => {
	try {
		const { todoId } = params;
		if (!todoId) throw new Error("todoId is required");

		const deleted = await Todo.findByIdAndDelete(todoId);
		if (!deleted) throw new Error("Todo not found");

		return {
			status: true,
			message: "Todo Deleted Successfully",
		};
	} catch (err) {
		throw new Error(`Failed to delete todo: ${err.message}`);
	}
};

module.exports = { createTodo, getAllTodos, updateTodo, deleteTodo };
