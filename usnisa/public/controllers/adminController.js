var appHome = angular.module('myApp', ['app.config']);

appHome.controller('adminController' , ['$scope','$http', 'app.config',function($scope, $http, config) {

	console.log("This is message from admin controller");

	$http({
		method: 'GET',
		url: config.basePath + '/admin/',
		//data: $scope.login,
		//withCredentials: true
		}).success(function(response) {
			if(response.status == 401 || response.status == 403)
				  window.location.replace("/signin-admin.html");
			
			if(response.status == 200) {
				$scope.propertyCount = response.propertyCount;
				$scope.feedbackCount = response.feedbackCount;
			}
				
		})
		.error(function (error, status){
			if(errResponse.status == 401 || errResponse.status == 403)
				  window.location.replace("/signin-admin.html");
		});
	
	//$scope.headerFB = "Your email address will not be published. Required fields are marked *";
	
}]);