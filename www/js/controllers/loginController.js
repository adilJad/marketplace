/*
* @Author: jad
* @Date:   2017-02-09 10:36:03
* @Last Modified by:   jad
* @Last Modified time: 2017-02-11 15:42:19
*/

'use strict';
controllers.controller("LoginController", function($scope, $state, $ionicSideMenuDelegate, $rootScope, $log, MarketplaceStorage, $cordovaToast, ObjectService) {
	$scope.$on('$ionicView.enter', function(e) {
		$ionicSideMenuDelegate.canDragContent(false);
		$rootScope.showMenuIcon = false;
	});

	$scope.loginData = {};


	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		MarketplaceStorage.executeQuery("SELECT * FROM Users").then(function(res) {
			for (var i = 0; i < res.rows.length; i++) {
				$log.debug(res.rows.item(i));
			}
		});
		var query = "SELECT * FROM Users WHERE username = ? AND password = ?";
		MarketplaceStorage.executeQuery(query, [$scope.loginData.username, $scope.loginData.password]).then(function(res) {
			if (res.rows.length == 0) {
				$cordovaToast.show("wrong username and/or password!", 'long', 'bottom');
			} else {
				ObjectService.setUser(res.rows.item(0));
				$state.go("app.browse");
			}
		}, function(error) {
			$log.error(error.message);
		});
	};
	
	$scope.signup = function() {
		$state.go("app.signup");
	}
})