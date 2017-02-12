var login = angular.module('myApp', ['app.config']);

login.controller('loginController' , ['$scope','$http', 'app.config',function($scope, $http, config) {

console.log("This is message from logincontroller");

$scope.logIn = function() {
  console.log($scope.login);
  $http.post( config.basePath + '/auth/login', $scope.login).success(function(response,status,header) {
  
  })
   .error(function (error, status){
        console.log(error, status); 
  }); 
  
  
  
	$http({
		method: 'GET',
		url: config.basePath + '/auth/check',
		//data: $scope.login,
		//withCredentials: true
	}).success(function(response) {
		console.log(response);
	})
	.error(function (error, status){
		console.log(error, status); 
	});
  
};

}]);