/*
* @Author: jad
* @Date:   2017-02-09 10:54:00
* @Last Modified by:   jad
* @Last Modified time: 2017-02-12 16:37:25
*/

'use strict';

var controllers = angular.module('marketplace.controllers', []);

controllers.controller('AppController', function($scope, $ionicModal, $timeout, Marketplace, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  	$scope.switchToStore = function() {
	  	MarketplaceStorage.executeQuery("SELECT * FROM Users WHERE isLoggedIn = 1").then(function(res) {
			$scope.user = res.rows.item(0);
	  		Marketplace.executeQuery("SELECT COUNT(*) AS c FROM Vouchers WHERE creator_id = ?", $scope.user.idUser).then(function(res) {
	  			if(res.rows.item(0).c == 0) {
	  				$state.go("app.newVoucher");
	  			} else {
	  				$state.go("app.myVoucher");
	  			}
	  		});
	  	});
  	}

})