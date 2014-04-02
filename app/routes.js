var repositoryFactory = require('./repositories/repositoryFactory');

module.exports = function(app) {

	var todoRepository = repositoryFactory.create('Todo');

	// Get all todos.
	app.get('/api/todos', function(req, res) {		
		findAllTodos(res);
	});

	// Create todo and return all todos.
	app.post('/api/todos', function(req, res) {
		saveTodo(req, res);		
	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		deleteTodo(req, res);
	});

	// Application.
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

	function findAllTodos(res) {
		todoRepository.FindAllTodos(function(err, todos) {
			if (err) {
				//res.send(err);
				console.log(err);
			}
		
			res.json(todos);
		});
	}

	function saveTodo(req, res) {
		todoRepository.Save({
			description: req.body.description,
			done: false,
			priority: req.body.priority,
			createDate: new Date(),
			dueDate: req.body.dueDate ? new Date(req.body.dueDate) : null
		}, function(err, todo) {
			if (err) {
				res.send(err);
			}
			
			findAllTodos(res);
		});
	}

	function deleteTodo(req, res) {
		todoRepository.DeleteById({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err) {
				res.send(err);
			}

			findAllTodos(res);
		});
	}
};
