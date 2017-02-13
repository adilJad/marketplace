/*
* @Author: jad
* @Date:   2017-02-12 21:52:03
* @Last Modified by:   jad
* @Last Modified time: 2017-02-13 09:49:40
*/

'use strict';

controllers.controller("NewOfferController", function($scope, MarketplaceStorage) {
	$scope.d = {
		selectedVoucher: 0
	};
	var query = "SELECT uv.id, v.idVoucher, title, shop, reduction, quantity, duration, creator_id FROM Vouchers AS v, Users_Vouchers AS uv WHERE uv.users_idUser = ? AND v.idVoucher = uv.vouchers_idVoucher";
	MarketplaceStorage.executeQuery(query, [$scope.data.user.idUser]).then(function(res) {
		$scope.d.vouchers = [];
		for (var i = 0; i < res.rows.length; i++) {
			$scope.d.vouchers.push(res.rows.item(i));
		}
	});

	$scope.offerVoucher = function() {
		var q = "INSERT INTO Offers(users_idUser, vouchers_idVoucher) VALUES(?, ?)";
		MarketplaceStorage.executeQuery(q, [$scope.data.user.idUser, $scope.d.selectedVoucher]).then(function(res) {
			$scope.newOfferModal.hide();
		});
	};

	$scope.hideModal = function() {
		$scope.newOfferModal.hide();
	};
})