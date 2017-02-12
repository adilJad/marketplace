/*
* @Author: jad
* @Date:   2017-02-09 10:27:47
* @Last Modified by:   jad
* @Last Modified time: 2017-02-12 19:16:41
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
			},
			'menuList': {
		      	templateUrl:'templates/menus/clientMenu.html'
		    }
		}
    })
    .state('app.signup', {
		url: '/signup',
		views: {
			'menuContent': {
				templateUrl: 'templates/signup.html',
				controller: 'SignupController'
			},
			'menuList': {
		      	templateUrl:'templates/menus/clientMenu.html'
		    }
		}
    })
    .state('app.browse', {
		url: '/browse',
		views: {
			'menuContent': {
				templateUrl: 'templates/client/browse.html',
				controller: 'BrowseController'
			},
			'menuList': {
		      	templateUrl:'templates/menus/clientMenu.html'
		    }
		}
    })
   .state('app.trade', {
		url: '/trade',
		views: {
			'menuContent': {
				templateUrl: 'templates/client/trade.html',
				controller: 'TradeController'
			},
			'menuList': {
		      	templateUrl:'templates/menus/clientMenu.html'
		    }
		}
    })
    .state('app.vouchers', {
		url: '/vouchers',
		views: {
			'menuContent': {
				templateUrl: 'templates/client/vouchers.html',
				controller: 'VouchersController'
			},
			'menuList': {
		      	templateUrl:'templates/menus/clientMenu.html'
		    }
		}
    })
    .state('app.settings', {
		url: '/settings',
		views: {
			'menuContent': {
				templateUrl: 'templates/client/settings.html',
				controller: 'SettingsController'
			},
			'menuList': {
		      	templateUrl:'templates/menus/clientMenu.html'
		    }
		}
    })
    .state('app.newVoucher', {
		url: '/newVoucher',
		views: {
			'menuContent': {
				templateUrl: 'templates/store/newVoucher.html',
				controller: 'NewVoucherController'
			},
			'menuList': {
		      	templateUrl:'templates/menus/shopMenu.html'
		    }
		}
    })
    .state('app.myVouchers', {
		url: '/myVouchers',
		views: {
			'menuContent': {
				templateUrl: 'templates/store/myVouchers.html',
				controller: 'MyVouchersController'
			},
			'menuList': {
		      	templateUrl:'templates/menus/shopMenu.html'
		    }
		}
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});



