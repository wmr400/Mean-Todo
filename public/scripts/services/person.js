angular.module('todoApp.services')

	.factory('PersonService', ['$http', function($http){
		return {
			get: function() {
				return $http.get('/api/persons');
			},
		}
	}]);