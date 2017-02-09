/*
* @Author: jad
* @Date:   2017-02-09 10:36:03
* @Last Modified by:   jad
* @Last Modified time: 2017-02-09 12:50:00
*/

'use strict';
controllers.controller("LoginController", function($scope, $ionicSideMenuDelegate, $rootScope, $log) {
	$ionicSideMenuDelegate.canDragContent(false);
	$rootScope.showMenuIcon = false;

	$scope.loginData = {};


	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		$log.debug($scope.loginData);
	};
	
})