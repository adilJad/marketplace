/*
* @Author: jad
* @Date:   2017-02-09 10:34:21
* @Last Modified by:   jad
* @Last Modified time: 2017-02-11 17:14:57
*/

'use strict';

controllers.controller("BrowseController", function($scope, $state, $ionicSideMenuDelegate, $rootScope, $log, MarketplaceStorage, ObjectService) {

	$scope.$on('$ionicView.enter', function(e) {
		$ionicSideMenuDelegate.canDragContent(true);
		$rootScope.showMenuIcon = true;
		$scope.data = {};
		var user = ObjectService.getUser();
		var selectAllVouchers = "SELECT title, store, quantity, duration, creator_id, firstname, lastname, idUser FROM Vouchers, Users WHERE creator_id != ? AND creator_id = idUser ORDER BY idVoucher DESC";
		MarketplaceStorage.executeQuery(selectAllVouchers, [user.idUser]).then(function(res) {
			for (var i = 0; i < res.rows.length; i++) {
				$scope.data.vouchers.push(res.rows.item(i));
			}
		});
	});

})