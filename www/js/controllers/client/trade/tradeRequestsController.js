'use strict';

controllers.controller("TradeRequestsController", function($scope, MarketplaceStorage, $ionicModal, $ionicSideMenuDelegate, $rootScope, $cordovaToast) {
	
	$scope.$on('$ionicView.beforeEnter', function(event, config) {
		// config.enableBack = false;
		$ionicSideMenuDelegate.canDragContent(true);
		$rootScope.showMenuIcon = true;

		MarketplaceStorage.executeQuery("SELECT * FROM Users WHERE isLoggedIn = 1").then(function(res) {
			$scope.data = {};
			$scope.data.user = res.rows.item(0);
			var selectRequests = "SELECT r.idRequest, shop, firstname, lastname, idUser FROM Requests AS r, Users AS u  WHERE r.users_idUser = u.idUser AND u.idUser != ?";
			// var selectRequests = "SELECT * FROM Requests";
			MarketplaceStorage.executeQuery(selectRequests, [$scope.data.user.idUser]).then(function(res) {
				$scope.data.requests = [];
				for (var i = 0; i < res.rows.length; i++) {
					$scope.data.requests.push(res.rows.item(i));
				}
			});
		})
	});

	$scope.newRequest = function() {
		$ionicModal.fromTemplateUrl("templates/client/trade/newRequestModal.html", {
			scope: $scope,
			animation: "slide-in-up"
		}).then(function(modal) {
			$scope.newRequestModal = modal;
			$scope.newRequestModal.show();
		})
	}

	$scope.answerRequest = function(i) {
		var message = $scope.data.user.firstname + " " + $scope.data.user.lastname + " has asked to receive your offer \"" + $scope.data.offers[i].title + "\" with discount of -" + $scope.data.offers[i].reduction + "% in the shop: \"" + $scope.data.offers[i].shop + "\"";
		MarketplaceStorage.executeQuery("INSERT INTO Notifications(message, vouchers_idVoucher, senderId, receiverId, type, isRead) VALUES(?, ?, ?, ?, ?, ?)", [message, $scope.data.offers[i].idVoucher, $scope.data.user.idUser, $scope.data.offers[i].idUser, "offer", 0]).then(function() {
			$cordovaToast.show("A request has been sent to " + $scope.data.offers[i].firstname + " " + $scope.data.offers[i].lastname, 'long', 'bottom');
		})
	}
})