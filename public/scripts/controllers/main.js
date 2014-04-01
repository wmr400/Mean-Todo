angular.module('todoApp.controllers')

	.controller('MainController', [
		'$scope', 
		'$http', 
		'TodoService', 
		'AlertService',
		function($scope, $http, TodoService, AlertService) {
			
			// The priorities that a todo can have.
			$scope.priorities = [
				'Undefined', 
				'Critical', 
				'Major', 
				'Minor', 
				'Trivial'
			];

			var resetFormData = function() {
				$scope.formData = {
					priority: 'Undefined'
				};
			}

			// First, make sure the form is empty.
			resetFormData();

			// We've landed on the home page, retrieve all todos and display them.
			TodoService.get()
				.success(function(data) {
					$scope.todos = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});

			// when submitting the add form, send the text to the node API
			$scope.createTodo = function() {

				if ($scope.formData.description && $scope.formData.description.length > 0) {

					TodoService.create($scope.formData)
						.success(function(data) {
							AlertService.addSuccess('todo added successfully');
							resetFormData(); // clear the form so our user is ready to enter another
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
						AlertService.addSuccess('todo deleted successfully');
						$scope.todos = data;
						console.log(data);
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
			};

			$scope.isCritical = function(todo) {
				return todo.priority == 'Critical';
			};

			$scope.getCreateDateTime = function(todo) {
				var date = new Date(todo.createDate);
				return date.toLocaleString();
			};

			$scope.getDueDateTime = function(todo) {
				if (todo.dueDate) {
					var date = new Date(todo.dueDate);
					return date.toLocaleString();
				} else {
					return "-";
				}
			}

			$scope.bla = function() {
				return "sodaksod";
			};

			// Disable weekend selection
			  $scope.disabled = function(date, mode) {
			    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
			  };

			  $scope.toggleMin = function() {
			    $scope.minDate = ( $scope.minDate ) ? null : new Date();
			  };
			  $scope.toggleMin();

			  $scope.open = function($event) {
			    $event.preventDefault();
			    $event.stopPropagation();

			    $scope.opened = true;
			  };

			  $scope.dateOptions = {
			    'year-format': "'yy'",
			    'starting-day': 1
			  };

			  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
			  $scope.format = $scope.formats[0];

	}]);
