/*
* @Author: jad
* @Date:   2017-02-09 11:10:13
* @Last Modified by:   jad
* @Last Modified time: 2017-02-12 11:09:11
*/

'use strict';

controllers.controller("SignupController", function($scope, $state, $log, $ionicSideMenuDelegate, $rootScope, $cordovaToast, MarketplaceStorage, $ionicPopup) {
	$scope.$on('$ionicView.enter', function(e) {
		$ionicSideMenuDelegate.canDragContent(false);
		$rootScope.showMenuIcon = false;
	});

	$scope.signupData = {};
	$scope.signupData.password = "";
	$scope.signupData.firstName = "";
	$scope.signupData.lastName = "";
	$scope.signupData.email = "";
	$scope.signupData.username = "";

	$scope.signup = function() {
		$log.debug($scope.signupData);
		if($scope.signupData.password == "" || $scope.signupData.firstName == "" || $scope.signupData.lastName == "" ||  $scope.signupData.email == "" || $scope.signupData.username == ""){
			$cordovaToast.show("Sign up form is incomplete", 'long', 'bottom');
		} else {
			MarketplaceStorage.executeQuery('INSERT INTO Users(firstname, lastname, email , username, password, isLoggedIn) VALUES(?, ?, ?, ?, ?, ?)', [$scope.signupData.fisrtName, $scope.signupData.lastName, $scope.signupData.email, $scope.signupData.username, $scope.signupData.password, 0]).then(function() {
				$cordovaToast.show("user created successfully! please log in", 'long', 'bottom');
				$state.go("app.login");
			}, function(err) {
				$cordovaToast.show("this username is taken", 'long', 'bottom');
			});
		}
	}
})