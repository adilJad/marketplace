/*
* @Author: jad
* @Date:   2017-02-09 12:41:15
* @Last Modified by:   jad
* @Last Modified time: 2017-02-12 09:41:23
*/

'use strict';

marketplace.factory("MarketplaceStorage", function($cordovaSQLite, $q, $log) {

	var db = null;

	function createDb(dbName) {
		db = $cordovaSQLite.openDB({name:dbName, iosDatabaseLocation: 'default', androidDatabaseLocation:'default'});
	}

	function executeQuery(query, values) {
		var deffered = $q.defer();
		$cordovaSQLite.execute(db, query, values)
		.then(function(res) {
			$log.debug(res);
			deffered.resolve(res);
	    }, function(err) {
	    	$log.log(query);
			$log.error(err);
			deffered.reject(err);
	    });

	    return deffered.promise;
	}

	return {
		createDb : createDb,
		executeQuery : executeQuery
	}
})