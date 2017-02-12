/*
* @Author: jad
* @Date:   2017-02-09 12:41:15
* @Last Modified by:   jad
* @Last Modified time: 2017-02-12 14:34:09
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
			if(res.rows.length) {
				for (var i = 0; i < res.rows.length; i++) {
					$log.debug(res.rows.item(i));
				}
			} else{
				$log.debug(res);
			}
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