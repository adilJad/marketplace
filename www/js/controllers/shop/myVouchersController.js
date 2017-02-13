/*
* @Author: jad
* @Date:   2017-02-09 11:01:40
* @Last Modified by:   jad
* @Last Modified time: 2017-02-12 20:15:28
*/

'use strict';

controllers.controller('MyVouchersController', function($scope, $ionicSideMenuDelegate, $rootScope, MarketplaceStorage, $ionicPopup) {
	$scope.$on('$ionicView.beforeEnter', function(event, config) {
		config.enableBack = false;
		$ionicSideMenuDelegate.canDragContent(true);
		$rootScope.showMenuIcon = true;

		MarketplaceStorage.executeQuery("SELECT * FROM Users WHERE isLoggedIn = 1").then(function(res) {
			$scope.data = {};
			$scope.data.user = res.rows.item(0);
			var selectAllVouchers = "SELECT idVoucher, title, shop, reduction, quantity, duration, creator_id FROM Vouchers WHERE creator_id = ? ORDER BY idVoucher DESC";
			MarketplaceStorage.executeQuery(selectAllVouchers, [$scope.data.user.idUser]).then(function(res) {
				$scope.data.vouchers = [];
				for (var i = 0; i < res.rows.length; i++) {
					$scope.data.vouchers.push(res.rows.item(i));
				}
			});
		})
	});

	$scope.deleteVoucher = function(i) {
		$scope.confirmDelete = $ionicPopup.confirm({
	       title: 'Delete this Voucher',
	       template: 'Are you sure you want to remove this voucher?'
     	});
		$scope.confirmDelete.then(function(res) {
			if(res) {
				MarketplaceStorage.executeQuery("DELETE FROM Vouchers WHERE idVoucher = ? ", [$scope.data.vouchers[i].idVoucher]).then(function(res) {

					var q = $scope.data.vouchers[i].quantity + 1;
					var id = $scope.data.vouchers[i].idVoucher;
					$scope.data.vouchers.splice(i, 1);
					MarketplaceStorage.executeQuery("UPDATE Vouchers SET quantity = ? WHERE idVoucher = ?", [q, id]).then(function(res) {
					});
				});
			}
		});
	}
})