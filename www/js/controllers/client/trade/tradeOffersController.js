'use strict';

controllers.controller("TradeOffersController", function($scope, MarketplaceStorage, $ionicModal, $ionicSideMenuDelegate, $rootScope, $cordovaToast) {
	
	$scope.$on('$ionicView.beforeEnter', function(event, config) {
		// config.enableBack = false;
		$ionicSideMenuDelegate.canDragContent(true);
		$rootScope.showMenuIcon = true;

		MarketplaceStorage.executeQuery("SELECT * FROM Users WHERE isLoggedIn = 1").then(function(res) {
			$scope.data = {};
			$scope.data.user = res.rows.item(0);
			var selectOffers = "SELECT o.idOffer, v.idVoucher, title, shop, reduction, quantity, duration, creator_id, firstname, lastname, idUser FROM Vouchers AS v, Users AS u, Offers AS o WHERE o.users_idUser = u.idUser AND v.idVoucher = o.vouchers_idVoucher AND u.idUser != ?";
			MarketplaceStorage.executeQuery(selectOffers, [$scope.data.user.idUser]).then(function(res) {
				$scope.data.offers = [];
				for (var i = 0; i < res.rows.length; i++) {
					$scope.data.offers.push(res.rows.item(i));
				}
			});
		})
	});

	$scope.newOffer = function() {
		$ionicModal.fromTemplateUrl("templates/client/trade/newOfferModal.html", {
			scope: $scope,
			animation: "slide-in-up"
		}).then(function(modal) {
			$scope.newOfferModal = modal;
			$scope.newOfferModal.show();
		})
	}

	$scope.requestOffer = function(i) {
		var message = $scope.data.user.firstname + " " + $scope.data.user.lastname + " has asked to receive your offer \"" + $scope.data.offers[i].title + "\" with discount of -" + $scope.data.offers[i].reduction + "% in the shop: \"" + $scope.data.offers[i].shop + "\"";
		MarketplaceStorage.executeQuery("INSERT INTO Notifications(message, vouchers_idVoucher, senderId, receiverId, type, isRead) VALUES(?, ?, ?, ?, ?, ?)", [message, $scope.data.offers[i].idVoucher, $scope.data.user.idUser, $scope.data.offers[i].idUser, "offer", 0]).then(function() {
			$cordovaToast.show("A request has been sent to " + $scope.data.offers[i].firstname + " " + $scope.data.offers[i].lastname, 'long', 'bottom');
		})
	}
})