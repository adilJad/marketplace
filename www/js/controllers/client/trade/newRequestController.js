
'use strict';

controllers.controller("NewRequestController", function($scope, MarketplaceStorage, $cordovaToast) {
	$scope.d = {
		selectedShop: -1
	};
	var query = "SELECT DISTINCT shop FROM Vouchers";
	MarketplaceStorage.executeQuery(query, []).then(function(res) {
		$scope.d.shops = [];
		for (var i = 0; i < res.rows.length; i++) {
			$scope.d.shops.push({
				id: i,
				shop: res.rows.item(i).shop
			});
		}
	});

	$scope.publishRequest = function() {
		if($scope.d.selectedShop >= 0) {
			console.log($scope.d.shops);
			console.log($scope.d.selectedShop);
			var q = "INSERT INTO Requests(shop, users_idUser) VALUES(?, ?)";
			MarketplaceStorage.executeQuery(q, [$scope.d.shops[$scope.d.selectedShop].shop, $scope.data.user.idUser]).then(function(res) {
				$cordovaToast.show("Your request has been published", 'long', 'bottom');
				$scope.newRequestModal.hide();
			});
		} else {
			$cordovaToast.show("Please choose a shop", 'long', 'bottom');
		}
	};

	$scope.hideModal = function() {
		$scope.newRequestModal.hide();
	};
})