/*
* @Author: jad
* @Date:   2017-02-09 10:34:21
* @Last Modified by:   jad
* @Last Modified time: 2017-02-12 10:20:26
*/

'use strict';

controllers.controller("BrowseController", function($scope, $state, $ionicSideMenuDelegate, $rootScope, $log, MarketplaceStorage, ObjectService, $stateParams) {
	$scope.$on('$ionicView.beforeEnter', function(event, config) {
		config.enableBack = false;
		$ionicSideMenuDelegate.canDragContent(true);
		$rootScope.showMenuIcon = true;

		MarketplaceStorage.executeQuery("SELECT * FROM Users WHERE isLoggedIn = 1").then(function(res) {
			var user = res.rows.item(0);
			var selectAllVouchers = "SELECT title, shop, reduction, quantity, duration, creator_id, firstname, lastname, idUser FROM Vouchers, Users WHERE creator_id != ? AND creator_id = idUser ORDER BY idVoucher DESC";
			MarketplaceStorage.executeQuery(selectAllVouchers, [user.idUser]).then(function(res) {
				$scope.data = {
					vouchers: []
				};
				for (var i = 0; i < res.rows.length; i++) {
					$scope.data.vouchers.push(res.rows.item(i));
				}
			});
		})
	});

})