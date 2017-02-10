/*
* @Author: jad
* @Date:   2017-02-09 10:34:21
* @Last Modified by:   jad
* @Last Modified time: 2017-02-10 12:18:37
*/

'use strict';

controllers.controller("BrowseController", function($scope, $state, $ionicSideMenuDelegate, $rootScope, $log, $cordovaSQLite) {

	$scope.$on('$ionicView.enter', function(e) {
		$ionicSideMenuDelegate.canDragContent(true);
		$rootScope.showMenuIcon = true;

		var selectAllVouchers = "SELECT * FROM vouchers WHERE creator_id != ? ORDER BY idVoucher DESC";
		$cordovaSQLite.execute($scope.db, selectAllVouchers, []);

		
	});

})