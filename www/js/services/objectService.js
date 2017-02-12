/*
* @Author: jad
* @Date:   2017-02-10 12:20:27
* @Last Modified by:   jad
* @Last Modified time: 2017-02-12 10:08:50
*/

'use strict';
marketplace.factory("ObjectService", function(MarketplaceStorage) {
	var user = null;

	return {
		getUser: function() {
			return user;
		},
		getLoggedUser: function() {
			MarketplaceStorage.executeQuery("SELECT * FROM Users WHERE isLoggedIn = 1", []).then(function(res) {
				return res.rows.item(0);
			}, function(err) {
				return null;
			})
		},
		setUser: function(data) {
			user = data;
		}
	}
})