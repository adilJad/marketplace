'use strict';
controllers.controller("NotificationsController", function($scope, MarketplaceStorage, $ionicPopup, $ionicSideMenuDelegate, $rootScope, $cordovaToast) {

	$scope.$on('$ionicView.beforeEnter', function(event, config) {
		config.enableBack = false;
		$ionicSideMenuDelegate.canDragContent(true);
		$rootScope.showMenuIcon = true;

		MarketplaceStorage.executeQuery("SELECT * FROM Users WHERE isLoggedIn = 1").then(function(res) {
			$scope.data = {};
			$scope.data.user = res.rows.item(0);
			var selectNotifications = "SELECT * FROM Notifications WHERE receiverId = ? ORDER BY idNotification DESC";
			MarketplaceStorage.executeQuery(selectNotifications, [$scope.data.user.idUser]).then(function(res) {
				$scope.data.notifications = [];
				for (var i = 0; i < res.rows.length; i++) {
					$scope.data.notifications.push(res.rows.item(i));
				}
			});
		})
	});

	$scope.action = function(i) {
		if($scope.data.notifications[i].isRead == 0) {
			var type = $scope.data.notifications[i].type;
			switch(type){
				case "offer_rejected":
					displayAnswer(i);
					break;
				case "offer_accepted":
					displayAnswer(i);
					break;
				case "offer":
					anwserOffer(i);
					break;
				case "request":
					answerRequest(i)
					break
			}
		} else {
			$cordovaToast.show("Your have already replied to this!", 'long', 'bottom');
		}
	}

	function displayAnswer(i) {
		var title = $scope.data.notifications[i].type == "offer_rejected" ? "Offer rejected" : "Offer accepted";
		var alertPopup = $ionicPopup.alert({
			title: title,
			template: $scope.data.notifications[i].message
		});
		alertPopup.then(function() {
			MarketplaceStorage.executeQuery("UPDATE Notifications SET isRead = 1 WHERE idNotification = ?", [$scope.data.notifications[i].idNotification]).then(function() {
				$scope.data.notifications[i].isRead = 1;
			});
		})
	}

	function anwserOffer(i) {
		$scope.actionsPopup = $ionicPopup.show({
			title: 'Respond to this request',
			template: $scope.data.notifications[i].message,
			scope: $scope,
			buttons: [
	       		{ 
	       			text: 'Refuse',
	       			onTap: function(e) {
	       				var message =  $scope.data.user.firstname + " " + $scope.data.user.lastname + " has rejected your request";
	       				var q = "INSERT INTO Notifications(message, vouchers_idVoucher, senderId, receiverId, type, isRead) VALUES(?, ?, ?, ?, ?, ?)";
	       				MarketplaceStorage.executeQuery(q, [message, $scope.data.notifications[i].vouchers_idVoucher, $scope.data.notifications[i].receiverId, $scope.data.notifications[i].senderId,"offer_rejected", 0]).then(function() {
	       					$cordovaToast.show("Your answer has been sent", 'long', 'bottom');
	       					MarketplaceStorage.executeQuery("UPDATE Notifications SET isRead = 1 WHERE idNotification = ?", [$scope.data.notifications[i].idNotification]).then(function() {
	       						$scope.data.notifications[i].isRead = 1;
	       					})
	       				})
	       			}
	       		},
	       		{
			        text: '<b>Accept</b>',
			        type: 'button-positive',
			        onTap: function(e) {
			          	var q = "UPDATE Users_Vouchers SET users_idUser = ? WHERE vouchers_idVoucher = ? AND users_idUser = ?";
			          	MarketplaceStorage.executeQuery(q, [$scope.data.notifications[i].senderId, $scope.data.notifications[i].vouchers_idVoucher, $scope.data.user.idUser]).then(function(res) {
			          		var m =  $scope.data.user.firstname + " " + $scope.data.user.lastname + " has accepted your request, check your claimed vouchers";
			          		var q1 = "INSERT INTO Notifications(message, vouchers_idVoucher, senderId, receiverId, type, isRead) VALUES(?, ?, ?, ?, ?, ?)";
			          		MarketplaceStorage.executeQuery(q1, [m, $scope.data.notifications[i].vouchers_idVoucher, $scope.data.notifications[i].receiverId, $scope.data.notifications[i].senderId,"offer_accepted", 0]).then(function() {
	       						MarketplaceStorage.executeQuery("UPDATE Notifications SET isRead = 1 WHERE idNotification = ?", [$scope.data.notifications[i].idNotification]).then(function() {
	       							$scope.data.notifications[i].isRead = 1;
	       							MarketplaceStorage.executeQuery("DELETE FROM Offers WHERE users_idUser = ? AND vouchers_idVoucher = ?", [$scope.data.user.idUser, $scope.data.notifications[i].vouchers_idVouche]).then(function() {

	       							})
		       					});
		       				});
			          	})
			        }
			    }
			]
     	});
	}

	function answerRequest(i) {
		$scope.actionsPopup = $ionicPopup.show({
			title: 'Respond to this offer',
			template: $scope.data.notifications[i].message,
			scope: $scope,
			buttons: [
	       		{ 
	       			text: 'Refuse',
	       			onTap: function(e) {
	       				var message =  $scope.data.user.firstname + " " + $scope.data.user.lastname + " has rejected your offer";
	       				var q = "INSERT INTO Notifications(message, vouchers_idVoucher, senderId, receiverId, type, isRead) VALUES(?, ?, ?, ?, ?, ?)";
	       				MarketplaceStorage.executeQuery(q, [message, $scope.data.notifications[i].vouchers_idVoucher, $scope.data.notifications[i].receiverId, $scope.data.notifications[i].senderId,"offer_rejected", 0]).then(function() {
	       					$cordovaToast.show("Your answer has been sent", 'long', 'bottom');
	       					MarketplaceStorage.executeQuery("UPDATE Notifications SET isRead = 1 WHERE idNotification = ?", [$scope.data.notifications[i].idNotification]).then(function() {
	       						$scope.data.notifications[i].isRead = 1;
	       					})
	       				})
	       			}
	       		},
	       		{
			        text: '<b>Accept</b>',
			        type: 'button-positive',
			        onTap: function(e) {
			          	var q = "UPDATE Users_Vouchers SET users_idUser = ? WHERE vouchers_idVoucher = ? AND users_idUser = ?";
			          	MarketplaceStorage.executeQuery(q, [$scope.data.notifications[i].receiverId, $scope.data.notifications[i].vouchers_idVoucher, $scope.data.notifications[i].senderId]).then(function(res) {
			          		var m =  $scope.data.user.firstname + " " + $scope.data.user.lastname + " has accepted your offer, and says thank you!";
			          		var q1 = "INSERT INTO Notifications(message, vouchers_idVoucher, senderId, receiverId, type, isRead) VALUES(?, ?, ?, ?, ?, ?)";
			          		MarketplaceStorage.executeQuery(q1, [m, $scope.data.notifications[i].vouchers_idVoucher, $scope.data.notifications[i].receiverId, $scope.data.notifications[i].senderId,"offer_accepted", 0]).then(function() {
	       						MarketplaceStorage.executeQuery("UPDATE Notifications SET isRead = 1 WHERE idNotification = ?", [$scope.data.notifications[i].idNotification]).then(function() {
	       							$scope.data.notifications[i].isRead = 1;
	       							MarketplaceStorage.executeQuery("DELETE FROM Requests WHERE users_idUser = ?", [$scope.data.user.idUser]).then(function() {

	       							});
		       					});
		       				});
			          	})
			        }
			    }
			]
     	});
	}
})