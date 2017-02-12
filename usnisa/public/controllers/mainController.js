var appHome = angular.module('myApp', ['app.config']);

appHome.controller('mainController' , ['$scope','$http', 'app.config',function($scope, $http, config) {

	console.log("This is message from latest prperty controller",config.basePath);

	
	/* Commenting property listings call
	$http({
		method: 'GET',
		url: config.basePath + '/list/',
		//data: $scope.login,
		//withCredentials: true
		}).success(function(response) {
			console.log(response);
			$scope.latestProperties = response;
		})
		.error(function (error, status){
			console.log(error, status); 
		});
	*/	
	
	$scope.headerFB = "Your email address will not be published. Required fields are marked *";
	
	$scope.submitFeedBackForm = function() {

			// check to make sure the form is completely valid
			if ($scope.userFeedbackForm.$valid) {
				
				$http.post( config.basePath + '/fback', $scope.userFeedback).success(function(response,status,header) {
					if(response.status == 200) {
						$scope.headerFB = "Thank you for your valuable feedback";
						$scope.userFeedback = {};
						//$scope.submitFeedBackForm.$setUntouched();
						$scope.submitFeedBackForm.$setPristine();
					}	
				})
				.error(function (error, status, xhr){
					console.log(error, status, xhr); 
				});
			}

		};

}]);