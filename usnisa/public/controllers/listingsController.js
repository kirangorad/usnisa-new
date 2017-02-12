var appHome = angular.module('myApp', ['app.config']);

appHome.controller('listingsController' , ['$scope','$http', 'app.config',function($scope, $http, config) {

	console.log("This is message from prperty controller",config.basePath);

	
	
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
		
	

}]);