/*
* @Author: jad
* @Date:   2017-02-09 11:09:45
* @Last Modified by:   jad
* @Last Modified time: 2017-02-12 15:40:48
*/

'use strict';

controllers.controller("VouchersController", function($scope, $ionicSideMenuDelegate, $rootScope, MarketplaceStorage, $ionicPopup) {
	$scope.$on('$ionicView.beforeEnter', function(event, config) {
		$ionicSideMenuDelegate.canDragContent(true);
		$rootScope.showMenuIcon = true;
		
		MarketplaceStorage.executeQuery("SELECT * FROM Users WHERE isLoggedIn = 1").then(function(res) {
			$scope.data = {};
			$scope.data.user = res.rows.item(0);
			MarketplaceStorage.executeQuery("SELECT uv.id, v.idVoucher, title, shop, reduction, quantity, duration, creator_id, firstname, lastname, idUser FROM Vouchers AS v, Users AS u, Users_Vouchers AS uv WHERE uv.users_idUser = u.idUser AND v.idVoucher = uv.vouchers_idVoucher AND u.idUser = ?", [$scope.data.user.idUser]).then(function(res) {
				$scope.data.vouchers = [];
				for (var i = 0; i < res.rows.length; i++) {
					$scope.data.vouchers.push(res.rows.item(i));
				}

			});
		});
	});

	$scope.deleteVoucher = function(i) {
		$scope.confirmDelete = $ionicPopup.confirm({
	       title: 'Delete this Voucher',
	       template: 'Are you sure you want to remove this voucher?'
     	});
		$scope.confirmDelete.then(function(res) {
			if(res) {
				MarketplaceStorage.executeQuery("DELETE FROM Users_Vouchers WHERE id = ? ", [$scope.data.vouchers[i].id]).then(function(res) {

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