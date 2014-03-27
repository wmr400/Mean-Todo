angular.module('todoApp.controllers')

	.controller('MainController', ['$scope', '$http', 'TodoService', 'PersonService', function($scope, $http, TodoService, PersonService) {
			$scope.formData = {};
			$scope.successAlerts = [];
			$scope.dangerAlerts = [];

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
							$scope.successAlerts.push({
								type: 'success',
								msg: 'todo added successfully'
							});
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
						$scope.dangerAlerts.push({
								type: 'danger',
								msg: 'todo deleted successfully'
							});
						$scope.todos = data;
						console.log(data);
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
			};

  			$scope.closeAlert = function(index, alerts) {
			    alerts.splice(index, 1);		  
			};

			$scope.noTodos = function() {
				return $scope.todos.length == 0;
			};

	}]);
