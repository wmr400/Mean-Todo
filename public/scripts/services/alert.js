angular.module('todoApp.services')

	.factory('AlertService', ['$rootScope', '$timeout', function($rootScope, $timeout) {

		var alertService = {};
		$rootScope.alerts = [];

		var addAlert = function(type, message, timeout) {
			var alert = createAlert(type, message);

			$rootScope.alerts.push(alert);

			if (timeout) {
				$timeout(function() {
					alertService.clearAlert(alert);
				}, timeout);
			}
		};

		var createAlert = function(type, message) {
			return {
				type: type,
				msg: message,
				close: function() {
					alertService.clearAlert(this);
				}
			};
		}

		return alertService = {
			addSuccess: function(message) {
				addAlert('success', message, 2000);
			},

			addDanger: function(message) {
				addAlert('danger', message);
			},

			clearAlert: function(alert) {
				var index = $rootScope.alerts.indexOf(alert);
				$rootScope.alerts.splice(index, 1);
			},

			clearAll: function() {
				$rootScope.alerts = [];
			}
		};
	}]);