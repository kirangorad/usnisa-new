var myApp = angular.module('myApp', ['app.config']);

myApp.controller('signUpController' , ['$scope','$http', 'app.config',function($scope, $http, config) {

console.log("This is message from signupcontroller");

$scope.signUp = function() {
  console.log($scope.signup);
  $http.post(config.basePath + '/auth/signup', $scope.signup).success(function(response) {
  console.log(response);
    
  })
  .error(function (error, status){
		console.log(error, status); 
  });
};

}]);

