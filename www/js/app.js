// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var db;
var marketplace = angular.module('marketplace', ['ionic', 'ngCordova', 'marketplace.controllers']);

marketplace.run(function($ionicPlatform, $log) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    /*try {
      db = $cordovaSQLite.openDB({name:"marketplace.db",location:'default'});
    } catch (error) {
      $log.error(error);
    }

    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Vouchers (idVoucher INTEGER PRIMARY KEY AUTOINCREMENT, Title, reduction INT, duration INT, quantity INT FOREIGN KEY )');
    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Users (idUser INTEGER PRIMARY KEY AUTOINCREMENT, firsname VARCHAR, lastname VARCHAR, email VARCHAR, username VARCHAR, password VARCHAR)');*/
  });
})
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.backButton.previousTitleText(false)
  $ionicConfigProvider.backButton.text('');
});