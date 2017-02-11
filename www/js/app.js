// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js


var marketplace = angular.module('marketplace', ['ionic', 'ngCordova', 'marketplace.controllers']);

marketplace.run(function($ionicPlatform, $log, $rootScope, MarketplaceStorage) {
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

    MarketplaceStorage.createDb("marketplace.db");
    MarketplaceStorage.executeQuery('CREATE TABLE IF NOT EXISTS Users (idUser INTEGER PRIMARY KEY AUTOINCREMENT, firsname VARCHAR, lastname VARCHAR, email VARCHAR, username VARCHAR UNIQUE, password VARCHAR, isLoggedIn INTEGER)', []);
    MarketplaceStorage.executeQuery('CREATE TABLE IF NOT EXISTS Vouchers (idVoucher INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR, shop VARCHAR, reduction INTEGER, duration INTEGER, quantity INTEGER, creator_id INTEGER, FOREIGN KEY(creator_id) REFERENCES Users(idUser))', []);
    MarketplaceStorage.executeQuery('CREATE TABLE IF NOT EXISTS Users_Vouchers (id INTEGER PRIMARY KEY AUTOINCREMENT, users_idUser INTEGER, vouchers_idVoucher INTEGER, FOREIGN KEY(users_idUser) REFERENCES Users(idUser), FOREIGN KEY(vouchers_idVoucher) REFERENCES Vouchers(idVoucher))', []);

    //populate database
    //some users
    MarketplaceStorage.executeQuery('INSERT OR IGNORE INTO Users(firsname, lastname, email , username, password, isLoggedIn) VALUES(?, ?, ?, ?, ?, ?)', ["Adam", "Bradly", "adam@bradly.com", "adam.bradly", "password", 0]);
    MarketplaceStorage.executeQuery('INSERT OR IGNORE INTO Users(firsname, lastname, email , username, password, isLoggedIn) VALUES(?, ?, ?, ?, ?, ?)', ["Ben", "Sperry", "ben@sperry.com", "ben.sperry", "password", 0]);
    MarketplaceStorage.executeQuery('INSERT OR IGNORE INTO Users(firsname, lastname, email , username, password, isLoggedIn) VALUES(?, ?, ?, ?, ?, ?)', ["Brandy", "Carney", "brandy@carney.com", "brandy.carney", "password", 0]);
    MarketplaceStorage.executeQuery('INSERT OR IGNORE INTO Users(firsname, lastname, email , username, password, isLoggedIn) VALUES(?, ?, ?, ?, ?, ?)', ["Bryan", "Oliver", "bryan@oliver.com", "bryan.oliver", "password", 0]);
    MarketplaceStorage.executeQuery('INSERT OR IGNORE INTO Users(firsname, lastname, email , username, password, isLoggedIn) VALUES(?, ?, ?, ?, ?, ?)', ["Dan", "Bucholtz", "dan@bucholtz.com", "dan.bucholtz", "password", 0]);

    //Vouchers
    MarketplaceStorage.executeQuery('INSERT OR IGNORE INTO Vouchers(title, reduction, duration, quantity, creator_id) VALUES(?, ?, ?, ?, ?)', ["Adam", "Bradly", 48, 25, 2]);
  })
})
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.backButton.previousTitleText(false)
  $ionicConfigProvider.backButton.text('');
});