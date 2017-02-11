/*
* @Author: jad
* @Date:   2017-02-09 11:10:13
* @Last Modified by:   jad
* @Last Modified time: 2017-02-11 10:55:14
*/

'use strict';

controllers.controller("SignupController", function($scope, $state, $log, $ionicSideMenuDelegate, $rootScope, $cordovaSQLite, $cordovaToast) {
	$scope.$on('$ionicView.enter', function(e) {
		$ionicSideMenuDelegate.canDragContent(false);
		$rootScope.showMenuIcon = false;
	});

	$scope.signupData = {};

	$scope.signup = function() {
		$log.debug($scope.signupData);
		var query = "INSERT INTO Users VALUES(?, ?, ?, ?, ?, ?)";
		$cordovaSQLite.execute(db, query, $scope.signupData.fisrtName, $scope.signupData.lastName, $scope.signupData.email, $scope.signupData.username, $scope.signupData.password, 0).then(function(res) {
			$cordovaToast.show("user created successfully!", 'long', 'bottom');
		})

	}
})