module.exports = function(app, repository) {

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
		repository.FindAllTodos(function(err, todos) {
			if (err) {
				res.send(err);
			}
		
			res.json(todos);
		});
	}

	function saveTodo(req, res) {
		repository.Save({
			text: req.body.text,
			done: false
		}, function(err, todo) {
			if (err) {
				res.send(err);
			}
			
			findAllTodos(res);
		});
	}

	function deleteTodo(req, res) {
		repository.DeleteById({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err) {
				res.send(err);
			}

			findAllTodos(res);
		});
	}
};
