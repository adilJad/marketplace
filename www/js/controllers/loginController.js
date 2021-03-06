'use strict';
controllers.controller("LoginController", function($scope, $state, $ionicSideMenuDelegate, $rootScope, $log, MarketplaceStorage, $cordovaToast, ObjectService, $ionicHistory) {
	$scope.$on('$ionicView.beforeEnter', function(event, config) {
		$ionicSideMenuDelegate.canDragContent(false);
		$rootScope.showMenuIcon = false;
		$ionicHistory.clearHistory();
		config.enableBack = false;
	});

	$scope.loginData = {};


	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		var query = "SELECT * FROM Users WHERE username = ? AND password = ?";
		MarketplaceStorage.executeQuery(query, [$scope.loginData.username, $scope.loginData.password]).then(function(res) {
			if (res.rows.length == 0) {
				$cordovaToast.show("wrong username and/or password!", 'long', 'bottom');
			} else {
				MarketplaceStorage.executeQuery("Update Users SET isLoggedIn = 1 WHERE idUser = ?", [res.rows.item(0).idUser]).then(function(res) {
					ObjectService.setUser(res.rows.item(0));
					$state.go("app.browse");
				});
			}
		}, function(error) {
			$log.error(error.message);
		});
	};
	
	$scope.signup = function() {
		$state.go("app.signup");
	}
})