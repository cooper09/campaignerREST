/*
	Legal Controllers
	
	• LegalListController: 
	• LegalDetailsController
	• LegalCreateController
*/

var legalControllers = angular.module('legalControllers', []);
var legalEndPoint = "http://claimit-backend-env-ycagthum3h.elasticbeanstalk.com/legal";

/*
	Legal Model
*/
var Legal = function()
{
	 this.data = {
	 	label: "untitled legal",
		content: "default"
	};
}

/*
	LegalListController
	• display list Legal items
	• create new Legal
*/
legalControllers.controller('LegalListController', ['$scope', '$http', '$location', function($scope, $http, $location) {
	
	$scope.sectionName = "Legal";
	$scope.createNewLink = "#/new/legal";
	
	// new Legal
	$scope.newLegal = function()
	{
		$location.path("#/legal/new")
	}
	
	// fetch Legal records
	$http.get(legalEndPoint).
	success(function(data) {
		console.log("legals loaded",data);
		$scope.legals = data.legals;
	});
}]);



/*
	LegalDetailsController
	• display Legal details
	• delete Legal
	• update Legal
*/
legalControllers.controller('LegalDetailsController', ['$scope', '$http','$routeParams','$location', function($scope, $http, $routeParams, $location) {

	$scope.sectionName = "Legal";
	$scope.saveButtonLabel = "UPDATE";
	$scope.hasDeleteButton = true;
	
	// delete Legal method
	$scope.deleteItem = function(){
		$http.delete(legalEndPoint + "/" + $scope.legal.data.legalId).
		success(function(data) {
			console.log("deleted Legal ",data);
			$location.path("/legal");
		});
	}
	
	// save Legal method
	$scope.saveItem = function()
	{
		console.log("saving: ", $scope.legal);
		$http.put(legalEndPoint+'/'+ $scope.legal.data.legalId, $scope.legal.data ).
		success(function(data) {
			console.log("updating legal ",data);
			$location.path("/legal");
			
		});
	}
	
	// get Legal details
	$http.get(legalEndPoint + '/' + $routeParams.itemId).
	success(function(data) {
		console.log("loaded Legal details");
		$scope.legal = data.legal;
		$scope.itemId = $scope.legal.data.legalId;

	});
}]);

/*
	LegalCreateController
*/
legalControllers.controller('LegalCreateController', ['$scope', '$http','$location', function($scope, $http, $location) {
	$scope.sectionName = "Legal";
	$scope.saveButtonLabel = "SAVE";
	$scope.hasDeleteButton = false;

	// create empty legal item
	$scope.legal = new Legal();
	
	// TO BE IMPLEMENTED
	$scope.deleteItem = function(){
		alert("delete: ", $scope.legal.data.legalId);
	}
	
	$scope.saveLegal = function()
	{
		console.log("save legal doc id: ", $scope.legal);
		$http.post(legalEndPoint+'/', $scope.legal.data).
		success(function(data) {
			console.log("LegalCreateController.saveItem - created legal object: ",data);
			$location.path("/legal");
			
		});
	}
}]);

