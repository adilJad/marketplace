'use strict';
var controllers = angular.module('marketplace.controllers', []);

controllers.controller('AppController', function($scope, $timeout, MarketplaceStorage, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  $scope.$on('$ionicView.enter', function(e) {
    MarketplaceStorage.executeQuery("SELECT * FROM Users WHERE isLoggedIn = 1").then(function(res) {
      if(res.rows.length > 0) {
        $scope.user = res.rows.item(0);
        MarketplaceStorage.executeQuery("SELECT COUNT(*) AS c FROM Notifications WHERE isRead = 0 AND receiverId = ?", [$scope.user.idUser]).then(function(res) {
            $scope.notificationsCount = res.rows.item(0).c;
        });
      }
    })
  });

  	$scope.inClientMode = true;

  	$scope.buttonTitle = "Switch to shop";

  	$scope.switchToStore = function() {
 		
  		if($scope.inClientMode) {
        MarketplaceStorage.executeQuery("SELECT COUNT(*) AS c FROM Vouchers WHERE creator_id = ?", [$scope.user.idUser]).then(function(res) {
		  			if(res.rows.item(0).c == 0) {
		  				$state.go("app.newVoucher");
		  			} else {
		  				$state.go("app.myVouchers");
		  			}
		  	});
		  	
  		} else {
        $state.go("app.browse");
  		}
  		console.log($scope.inClientMode);
  		$scope.inClientMode = !$scope.inClientMode;
  		$scope.buttonTitle = $scope.inClientMode ? "Switch to shop" : "Switch to client";
  	}

})