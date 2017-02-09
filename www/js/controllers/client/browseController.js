/*
* @Author: jad
* @Date:   2017-02-09 10:34:21
* @Last Modified by:   jad
* @Last Modified time: 2017-02-09 21:06:55
*/

'use strict';

controllers.controller("BrowseController", function($scope, $state, $ionicSideMenuDelegate, $rootScope, $log) {

	$scope.$on('$ionicView.enter', function(e) {
		$ionicSideMenuDelegate.canDragContent(true);
		$rootScope.showMenuIcon = true;
	});
})