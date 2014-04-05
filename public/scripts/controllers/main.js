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
				var options = { 
					year: "numeric", 
					month: "short", 
					day: "numeric", 
					hour: "numeric", 
					minute: "numeric", 
					second: "numeric", 
					hour12: false
				};
				return date.toLocaleString("en-US", options);
			};

			$scope.getDueDate = function(todo) {
				if (todo.dueDate) {
					var options = { 
						year: "numeric", 
						month: "short", 
						day: "numeric"
					};
					var date = new Date(todo.dueDate);
					return date.toLocaleString("en-US", options);
				} else {
					return '-';
				}
			}


			/* Date picker stuff */
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

			

			// /* Grid stuff */
			$scope.filterData = {
				filterText: ''
			};

			var deleteButtonMarkup = '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text><button type="button" class="btn btn-xs btn-success" ng-click="deleteTodo(row.entity._id)"><span class="glyphicon glyphicon-ok"></span></button></span></div>';
			var createDateMarkup = '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{getCreateDateTime(row.entity)}}</span></div>';
			var dueDateMarkup = '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{getDueDate(row.entity)}}</span></div>';

			var rowClassMarkup = 
				'ng-class="{rowCritical: row.getProperty(\'priority\') === \'Critical\', ' +
				// 'rowMajor: row.getProperty(\'priority\') === \'Major\', ' + 
				// 'rowMinor: row.getProperty(\'priority\') === \'Minor\', ' +
				'rowUndefined: row.getProperty(\'priority\') === \'Undefined\'}"';

			var rowTemplate = '<div style="height: 100%" ' + rowClassMarkup + '><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
                           '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
                           '<div ng-cell></div>' +
                     '</div></div>'

	      	var columnDefs = [ 
	        	{ field: 'description', displayName: 'Description', width: '****' },
	        	{ field: 'priority', displayName: 'Priority', width: '*' },
	        	{ field: 'createDate', cellTemplate: createDateMarkup, displayName: 'Date Created', width: '**' },
	        	{ field: 'dueDate', cellTemplate: dueDateMarkup, displayName: 'Date Due', width: '*' },
	        	{ field: 'action', displayName: 'Action', cellClass: 'centerCell', cellTemplate: deleteButtonMarkup, width: '*', sortable: false }
	        ];

 			$scope.gridOptions = { 
 				data: 'todos', 
 				columnDefs: columnDefs,
 				rowTemplate: rowTemplate,
 				enableRowSelection: true,
 				enableCellSelection: true,
 				filterOptions: $scope.filterData,
 				showColumnMenu: true,
			};	

	}]);
