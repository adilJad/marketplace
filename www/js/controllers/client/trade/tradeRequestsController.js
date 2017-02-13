'use strict';

controllers.controller("TradeRequestsController", function($scope, MarketplaceStorage, $ionicModal, $ionicSideMenuDelegate, $rootScope, $cordovaToast, $ionicPopup) {
	
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
		MarketplaceStorage.executeQuery("SELECT * FROM Vouchers AS v, Users_Vouchers AS uv WHERE v.shop = ? AND uv.users_idUser = ? AND uv.vouchers_idVoucher = v.idVoucher", [$scope.data.requests[i].shop, $scope.data.user.idUser]).then(function(res) {
			if(res.rows.length == 0) {
				$cordovaToast.show("You have no vouchers for this requests", 'long', 'bottom');
			} else {
				$scope.confirmRequest = $ionicPopup.confirm({
			       title: 'Offer voucher',
			       template: "Are you sure you want to Offer " + res.rows.item(0).title + " for this request?"
		     	});
		     	var voucher = res.rows.item(0);
				$scope.confirmRequest.then(function(res) {
					if(res) {
						var message = $scope.data.user.firstname + " " + $scope.data.user.lastname + " has offered for  your request, the voucher \"" + voucher.title + "\" with discount of -" + voucher.reduction + "% in the shop: \"" + $scope.data.requests[i].shop + "\"";

						MarketplaceStorage.executeQuery("INSERT INTO Notifications(message, vouchers_idVoucher, senderId, receiverId, type, isRead) VALUES(?, ?, ?, ?, ?, ?)", [message, voucher.idVoucher, $scope.data.user.idUser, $scope.data.requests[i].idUser, "request", 0]).then(function() {
							$cordovaToast.show("An offer has been sent to " + $scope.data.requests[i].firstname + " " + $scope.data.requests[i].lastname, 'long', 'bottom');
						})
					}
				})
			}
		})
	}
})