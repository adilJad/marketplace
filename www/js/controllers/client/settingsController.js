'use strict';

controllers.controller("SettingsController", function($scope, $state, $rootScope, $ionicSideMenuDelegate, MarketplaceStorage, $ionicPopup, $cordovaToast) {
	$scope.$on('$ionicView.beforeEnter', function(event, config) {
		$ionicSideMenuDelegate.canDragContent(true);
		$rootScope.showMenuIcon = true;
		MarketplaceStorage.executeQuery("SELECT * FROM Users WHERE isLoggedIn = 1").then(function(res) {
			$scope.data = {};
			$scope.data.user = res.rows.item(0);
		});
	});


	$scope.deleteAccount = function() {
		$scope.confirmDelete = $ionicPopup.confirm({
	       title: 'Delete this account',
	       template: 'Are you sure you want to delete your account?'
     	});
		$scope.confirmDelete.then(function(res) {
			if(res) {
				MarketplaceStorage.executeQuery("DELETE FROM Users WHERE idUser = ? ", [$scope.data.user.idUser]).then(function(res) {
					$cordovaToast.show("User account deleted", 'long', 'bottom');
					$state.go("app.login");
				});
			}
		});
	}

	$scope.logout = function() {
		MarketplaceStorage.executeQuery("UPDATE Users SET isLoggedIn = 0 WHERE idUser = ?", [$scope.data.user.idUser]).then(function(res) {
			$cordovaToast.show("Logged out!", 'long', 'bottom');
			$state.go("app.login");
		})
	}

})