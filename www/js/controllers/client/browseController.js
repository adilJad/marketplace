/*
* @Author: jad
* @Date:   2017-02-09 10:34:21
* @Last Modified by:   jad
* @Last Modified time: 2017-02-12 11:59:06
*/

'use strict';

controllers.controller("BrowseController", function($scope, $state, $ionicSideMenuDelegate, $rootScope, $log, MarketplaceStorage, ObjectService, $stateParams, $ionicPopup) {
	$scope.$on('$ionicView.beforeEnter', function(event, config) {
		config.enableBack = false;
		$ionicSideMenuDelegate.canDragContent(true);
		$rootScope.showMenuIcon = true;

		MarketplaceStorage.executeQuery("SELECT * FROM Users WHERE isLoggedIn = 1").then(function(res) {
			$scope.data = {};
			$scope.data.user = res.rows.item(0);
			var selectAllVouchers = "SELECT title, shop, reduction, quantity, duration, creator_id, firstname, lastname, idUser FROM Vouchers, Users WHERE creator_id != ? AND creator_id = idUser ORDER BY idVoucher DESC";
			MarketplaceStorage.executeQuery(selectAllVouchers, [$scope.data.user.idUser]).then(function(res) {
				$scope.data.vouchers = [];
				for (var i = 0; i < res.rows.length; i++) {
					$scope.data.vouchers.push(res.rows.item(i));
				}
			});
		})
	});

	$scope.requestVoucher = function(i) {
		$scope.confirmRequest = $ionicPopup.confirm({
	       title: 'Claim this Voucher',
	       template: 'Are you sure you want this Voucher?'
     	});
		$scope.confirmRequest.then(function(res) {
			if(res) {
				MarketplaceStorage.executeQuery("SELECT COUNT(*) AS c FROM Users_Vouchers WHERE users_idUser = ? AND vouchers_idVoucher = ? ", [$scope.data.user.idUser, $scope.data.vouchers[i].idVoucher]).then(function(res) {
					if(res.rows.item(0).c == 0) {
						MarketplaceStorage.executeQuery("INSERT INTO Users_Vouchers(users_idUser, vouchers_idVoucher) VALUES(?, ?)", [$scope.data.user.idUser, $scope.data.vouchers[i].idVoucher]).then(function(res) {
							var q = $scope.data.vouchers[i].quantity - 1;
							MarketplaceStorage.executeQuery("UPDATE Vouchers SET quantity=?", q);
						});
					} else {
						$cordovaToast.show("You already have this voucher", 'long', 'bottom');
					}
				});
			} else {
				console.log('You are not sure');
			}
		});
	};


})