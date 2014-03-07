angular.module('todoApp.controllers')

	.controller('MainController', [
		'$scope', 
		'$http', 
		'TodoService', 
		'PersonService' 
		function($scope, $http, TodoService, PersonService) {
			$scope.formData = {};

			// We've landed on the home page, retrieve all todos and display them.
			TodoService.get()
				.success(function(data) {
					$scope.todos = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});

			// PersonService.get()
			// 	.success(function(data) {
			// 		$scope.persons = data;
			// 		console.log(data);
			// 	})
			// 	.errror(function(data) {
			// 		console.log('Error: ' + data);
			// 	});

			// when submitting the add form, send the text to the node API
			$scope.createTodo = function() {

				if (!$.isEmptyObject($scope.formData)) {

					TodoService.create($scope.formData)
						.success(function(data) {
							$scope.formData = {}; // clear the form so our user is ready to enter another
							$scope.todos = data;
							console.log(data);
						})
						.error(function(data) {
							console.log('Error: ' + data);
						});
				}
			};

			// delete a todo after checking it
			$scope.deleteTodo = function(id) {
				TodoService.delete(id)
					.success(function(data) {
						$scope.todos = data;
						console.log(data);
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
			};
	}]);
