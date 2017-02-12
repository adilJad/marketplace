/*
* @Author: jad
* @Date:   2017-02-09 10:27:47
* @Last Modified by:   jad
* @Last Modified time: 2017-02-12 09:55:20
*/

'use strict';
marketplace.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('app', {
	    url: '/app',
	    abstract: true,
	    templateUrl: 'templates/menu.html',
	    controller: 'AppController'
	})
	.state('app.login', {
		url: '/login',
		views: {
			'menuContent': {
				templateUrl: 'templates/login.html',
				controller: 'LoginController'
			}
		}
    })
    .state('app.signup', {
		url: '/signup',
		views: {
			'menuContent': {
				templateUrl: 'templates/signup.html',
				controller: 'SignupController'
			}
		}
    })
    .state('app.browse', {
		url: '/browse',
		views: {
			'menuContent': {
				templateUrl: 'templates/client/browse.html',
				controller: 'BrowseController'
			}
		}
    })
   .state('app.trade', {
		url: '/trade',
		views: {
			'menuContent': {
				templateUrl: 'templates/client/trade.html',
				controller: 'TradeController'
			}
		}
    })
    .state('app.vouchers', {
		url: '/vouchers',
		views: {
			'menuContent': {
				templateUrl: 'templates/client/vouchers.html',
				controller: 'VouchersController'
			}
		}
    })
    .state('app.settings', {
		url: '/settings',
		views: {
			'menuContent': {
				templateUrl: 'templates/client/settings.html',
				controller: 'SettingsController'
			}
		}
    })
    .state('app.newVoucher', {
		url: '/newVoucher',
		views: {
			'menuContent': {
				templateUrl: 'templates/store/newVoucher.html',
				controller: 'NewVoucherController'
			}
		}
    })
    .state('app.myVouchers', {
		url: '/myVouchers',
		views: {
			'menuContent': {
				templateUrl: 'templates/store/myVouchers.html',
				controller: 'MyVouchersController'
			}
		}
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});



