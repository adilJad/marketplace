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
    MarketplaceStorage.executeQuery('CREATE TABLE IF NOT EXISTS Users (idUser INTEGER PRIMARY KEY AUTOINCREMENT, firstname VARCHAR, lastname VARCHAR, email VARCHAR, username VARCHAR UNIQUE, password VARCHAR, isLoggedIn INTEGER)', []);
    MarketplaceStorage.executeQuery('CREATE TABLE IF NOT EXISTS Vouchers (idVoucher INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR, shop VARCHAR, reduction INTEGER, duration INTEGER, quantity INTEGER, creator_id INTEGER, FOREIGN KEY(creator_id) REFERENCES Users(idUser))', []);
    MarketplaceStorage.executeQuery('CREATE TABLE IF NOT EXISTS Users_Vouchers (id INTEGER PRIMARY KEY AUTOINCREMENT, users_idUser INTEGER, vouchers_idVoucher INTEGER, FOREIGN KEY(users_idUser) REFERENCES Users(idUser), FOREIGN KEY(vouchers_idVoucher) REFERENCES Vouchers(idVoucher))', []);

    //populate database
    //some users
    MarketplaceStorage.executeQuery('INSERT OR IGNORE INTO Users(firstname, lastname, email , username, password, isLoggedIn) VALUES(?, ?, ?, ?, ?, ?)', ["Adam", "Bradly", "adam@bradly.com", "adam.bradly", "password", 0]);
    MarketplaceStorage.executeQuery('INSERT OR IGNORE INTO Users(firstname, lastname, email , username, password, isLoggedIn) VALUES(?, ?, ?, ?, ?, ?)', ["Ben", "Sperry", "ben@sperry.com", "ben.sperry", "password", 0]);
    MarketplaceStorage.executeQuery('INSERT OR IGNORE INTO Users(firstname, lastname, email , username, password, isLoggedIn) VALUES(?, ?, ?, ?, ?, ?)', ["Brandy", "Carney", "brandy@carney.com", "brandy.carney", "password", 0]);
    MarketplaceStorage.executeQuery('INSERT OR IGNORE INTO Users(firstname, lastname, email , username, password, isLoggedIn) VALUES(?, ?, ?, ?, ?, ?)', ["Bryan", "Oliver", "bryan@oliver.com", "bryan.oliver", "password", 0]);
    MarketplaceStorage.executeQuery('INSERT OR IGNORE INTO Users(firstname, lastname, email , username, password, isLoggedIn) VALUES(?, ?, ?, ?, ?, ?)', ["Dan", "Bucholtz", "dan@bucholtz.com", "dan.bucholtz", "password", 0]);

    //Vouchers
    MarketplaceStorage.executeQuery("SELECT COUNT(*) AS c FROM Vouchers", []).then(function(res) {
      if(res.rows.item(0).c == 0) {
        MarketplaceStorage.executeQuery('INSERT INTO Vouchers(title, shop, reduction, duration, quantity, creator_id) VALUES(?, ?, ?, ?, ?, ?)', ["Get ready for school!", "The cool library", 30, 48, 20, 2]);
        MarketplaceStorage.executeQuery('INSERT INTO Vouchers(title, shop, reduction, duration, quantity, creator_id) VALUES(?, ?, ?, ?, ?, ?)', ["Treat yo self this spring!", "Hipster clothing & accessories", 50, 48, 25, 3]);
        MarketplaceStorage.executeQuery('INSERT INTO Vouchers(title, shop, reduction, duration, quantity, creator_id) VALUES(?, ?, ?, ?, ?, ?)', ["Eat you weight in Cake!", "Bake n' Cake", 25, 48, 25, 1]);
        MarketplaceStorage.executeQuery('INSERT INTO Vouchers(title, shop, reduction, duration, quantity, creator_id) VALUES(?, ?, ?, ?, ?, ?)', ["Get you mom the gift she deserves for Mather's Day", "Jewelery store", 25, 48, 25, 1]);
        MarketplaceStorage.executeQuery('INSERT INTO Vouchers(title, shop, reduction, duration, quantity, creator_id) VALUES(?, ?, ?, ?, ?, ?)', ["No outfit is complete without nice shoes", "Shoe Store", 40, 48, 25, 5]);
        MarketplaceStorage.executeQuery('INSERT INTO Vouchers(title, shop, reduction, duration, quantity, creator_id) VALUES(?, ?, ?, ?, ?, ?)', ["Get smart with a smart watch", "Gadget store", 35, 48, 25, 4]);
        MarketplaceStorage.executeQuery('INSERT INTO Vouchers(title, shop, reduction, duration, quantity, creator_id) VALUES(?, ?, ?, ?, ?, ?)', ["Go see the world like you always dreamed", "Travel agency", 25, 30, 15, 3]);
      }
    })
  })
})
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.backButton.previousTitleText(false)
  $ionicConfigProvider.backButton.text('');
});