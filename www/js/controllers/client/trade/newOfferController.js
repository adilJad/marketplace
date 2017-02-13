'use strict';

controllers.controller("NewOfferController", function($scope, MarketplaceStorage, $cordovaToast) {
	$scope.d = {
		selectedVoucher: -1
	};
	var query = "SELECT uv.id, v.idVoucher, title, shop, reduction, quantity, duration, creator_id FROM Vouchers AS v, Users_Vouchers AS uv WHERE uv.users_idUser = ? AND v.idVoucher = uv.vouchers_idVoucher";
	MarketplaceStorage.executeQuery(query, [$scope.data.user.idUser]).then(function(res) {
		$scope.d.vouchers = [];
		for (var i = 0; i < res.rows.length; i++) {
			$scope.d.vouchers.push(res.rows.item(i));
		}
	});

	$scope.offerVoucher = function() {
		if($scope.d.selectedVoucher > 0) {
			var q = "INSERT INTO Offers(users_idUser, vouchers_idVoucher) VALUES(?, ?)";
			MarketplaceStorage.executeQuery(q, [$scope.data.user.idUser, $scope.d.selectedVoucher]).then(function(res) {
				$cordovaToast.show("You offer has been published", 'long', 'bottom');
				$scope.newOfferModal.hide();

			});
		} else {
			$cordovaToast.show("Please choose a voucher to offer", 'long', 'bottom');
		}
	};

	$scope.hideModal = function() {
		$scope.newOfferModal.hide();
	};
})