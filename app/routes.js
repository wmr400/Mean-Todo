//var repositoryFactory = require('./repositories/repositoryFactory');
var Todo = require('./models/todo');

module.exports = function(app) {

	//var todoRepository = repositoryFactory.create('Todo');

	// Get all todos.
	app.get('/api/todos', function(req, res) {		
		findAllTodos(res);
	});

	// Create todo and return all todos.
	app.post('/api/todos', function(req, res) {
		createTodo(req, res);		
	});

	// Update an existing todo, and return all of them.
	app.put('/api/todos/:todo_id', function(req, res) {
		//updateTodo(req, res);
	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		deleteTodo(req, res);
	});

	// Application.
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

	var findAllTodos = function(res) {
		Todo.find(function(err, todos) {
			if (err) {
				//res.send(err);
				console.log(err);
			}
		
			res.json(todos);
		});
	};

	var createTodo = function(req, res) {
		Todo.create({
			description: req.body.description,
			done: false,
			priority: req.body.priority,
			createDate: new Date(),
			dueDate: req.body.dueDate ? new Date(req.body.dueDate) : null
		}, function(err, todo) {
			if (err) {
				//res.send(err);
				console.log(err);
			}
			
			findAllTodos(res);
		});
	};

	// var updateTodo = function(req, res) {
	// 	todoRepository.Update({
	// 		id: req.params.todo_id,
	// 		description: req.body.description,
	// 		done: req.body.done,
	// 		priority: req.body.priority,
	// 		createDate: req.body.createDate,
	// 		dueDate: req.body.dueDate ? new Date(req.body.dueDate) : null
	// 	}, function(err, todo) {
	// 		if (err) {
	// 			res.send(err);
	// 		}
			
	// 		findAllTodos(res);
	// 	});
	// };

	var deleteTodo = function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err) {
				// res.send(err);
				console.log(err);
			}

			findAllTodos(res);
		});
	};
};
