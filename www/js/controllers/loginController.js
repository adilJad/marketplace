/*
* @Author: jad
* @Date:   2017-02-09 10:36:03
* @Last Modified by:   jad
* @Last Modified time: 2017-02-11 15:22:41
*/

'use strict';
controllers.controller("LoginController", function($scope, $state, $ionicSideMenuDelegate, $rootScope, $log, $cordovaSQLite, $cordovaToast, ObjectService) {
	$scope.$on('$ionicView.enter', function(e) {
		$ionicSideMenuDelegate.canDragContent(false);
		$rootScope.showMenuIcon = false;
	});

	$scope.loginData = {};


	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		$cordovaSQLite.execute($rootScope.db, "SELECT * FROM Users").then(function(res) {
			$log.debug(res.rows);
		});
		var query = "SELECT * FROM Users WHERE username = ? AND password = ?";
		$cordovaSQLite.execute($rootScope.db, query, [$scope.loginData.username, $scope.loginData.password]).then(function(res) {
			if (res.rows.length == 0) {
				$cordovaToast.show("wrong username and/or password!", 'long', 'bottom');
			} else {
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