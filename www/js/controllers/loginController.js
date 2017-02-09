/*
* @Author: jad
* @Date:   2017-02-09 10:36:03
* @Last Modified by:   jad
* @Last Modified time: 2017-02-09 21:52:58
*/

'use strict';
controllers.controller("LoginController", function($scope, $state, $ionicSideMenuDelegate, $rootScope, $log) {
	$scope.$on('$ionicView.enter', function(e) {
		$ionicSideMenuDelegate.canDragContent(false);
		$rootScope.showMenuIcon = false;
	});

	$scope.loginData = {};


	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		$state.go("app.browse");
	};
	
	$scope.signup = function() {
		$state.go("app.signup");
	}
})