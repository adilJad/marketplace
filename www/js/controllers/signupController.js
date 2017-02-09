/*
* @Author: jad
* @Date:   2017-02-09 11:10:13
* @Last Modified by:   jad
* @Last Modified time: 2017-02-09 21:10:10
*/

'use strict';

controllers.controller("SignupController", function($scope, $state, $log, $ionicSideMenuDelegate, $rootScope) {
	$scope.$on('$ionicView.enter', function(e) {
		$ionicSideMenuDelegate.canDragContent(false);
		$rootScope.showMenuIcon = false;
	});

	$scope.signupData = {};

	$scope.signup = function() {
		$log.debug($scope.signupData);
	}
})