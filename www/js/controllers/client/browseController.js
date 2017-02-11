/*
* @Author: jad
* @Date:   2017-02-09 10:34:21
* @Last Modified by:   jad
* @Last Modified time: 2017-02-11 15:51:45
*/

'use strict';

controllers.controller("BrowseController", function($scope, $state, $ionicSideMenuDelegate, $rootScope, $log, MarketplaceStorage, ObjectService) {

	$scope.$on('$ionicView.enter', function(e) {
		$ionicSideMenuDelegate.canDragContent(true);
		$rootScope.showMenuIcon = true;
		$scope.data = {};
		var user = ObjectService.getUser();
		var selectAllVouchers = "SELECT * FROM vouchers WHERE creator_id != ? ORDER BY idVoucher DESC";
		MarketplaceStorage.executeQuery(selectAllVouchers, [user.idUser]).then(function(res) {
			for (var i = 0; i < res.rows.length; i++) {
				$scope.data.vouchers.push(res.rows.item(i));
			}
		});
	});

})