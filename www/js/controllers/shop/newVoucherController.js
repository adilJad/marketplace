/*
* @Author: jad
* @Date:   2017-02-09 11:03:04
* @Last Modified by:   jad
* @Last Modified time: 2017-02-12 17:23:38
*/

'use strict';

controllers.controller('NewVoucherController', function($scope, ) {
	$scope.$on('$ionicView.beforeEnter', function(event, config) {
		$ionicSideMenuDelegate.canDragContent(true);
		$rootScope.showMenuIcon = true;
		$scope.voucherData = {};
		$scope.voucherData.shop = "";
		$scope.voucherData.title = "";
		$scope.voucherData.quantity = null;
		$scope.voucherData.reduction =null;
		$scope.voucherData.duration = null;
		MarketplaceStorage.executeQuery("SELECT * FROM Users WHERE isLoggedIn = 1").then(function(res) {
			$scope.voucherData.user = res.rows.item(0);
		});
	});

	$scope.createVoucher = function() {
		MarketplaceStorage.executeQuery('INSERT INTO Vouchers(title, shop, reduction, duration, quantity, creator_id) VALUES(?, ?, ?, ?, ?, ?)', [$scope.voucherData.title, $scope.voucherData.shop, $scope.voucherData.reduction, $scope.voucherData.duration, $scope.voucherData.quantity, $scope.voucherData.user.idUser]).then(function(res) {
			$state.go("app.myVouchers");
		})
	}
})