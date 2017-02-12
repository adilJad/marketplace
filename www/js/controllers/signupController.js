/*
* @Author: jad
* @Date:   2017-02-09 11:10:13
* @Last Modified by:   jad
* @Last Modified time: 2017-02-12 10:24:54
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
		MarketplaceStorage.executeQuery('INSERT OR IGNORE INTO Users(firstname, lastname, email , username, password, isLoggedIn) VALUES(?, ?, ?, ?, ?, ?)', [$scope.signupData.fisrtName, $scope.signupData.lastName, $scope.signupData.email, $scope.signupData.username, $scope.signupData.password, 0]).then(function() {
			$cordovaToast.show("user created successfully! please log in", 'long', 'bottom');
		});
		

	}
})