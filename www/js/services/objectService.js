/*
* @Author: jad
* @Date:   2017-02-10 12:20:27
* @Last Modified by:   jad
* @Last Modified time: 2017-02-11 15:35:03
*/

'use strict';
marketplace.factory("ObjectService", function() {
	var user = null;

	return {
		getUser: function() {
			return user;
		},
		setUser: function(data) {
			user = data;
		}
	}
})