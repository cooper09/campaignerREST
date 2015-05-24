
/*
	Country Controllers
	
	• CountryListController: 
	• CountryDetailsController
	• CountryCreateController

	cooper s - february 2015

*/

//General variable to inject on country support controllers at once
var countryControllers = angular.module('countryControllers', []);

/*
	Country Model
*/
var Country = function()
{
	this.countryId = "0";
	this.name = "USA";
	this.flag = "http://sonyainc.net/flags/usa-flag.jpg";
}

/*
	Country Controllers
	
	• CountryListController: 
	• CountryDetailsController
*/

var countryControllers = angular.module('countryControllers', []);

countryControllers.controller('CountryListController', ['$scope', 'countryFactory', '$sce', function($scope, countryFactory, $sce ) {	
	$scope.sectionName = "Country";
	$scope.createNewLink = "#/new/country";

	$scope.status;
	
	/*countryFactory.get().success(function(data) {
		console.log("My list of countries: " , data);
		$scope.countries = data;
		//console.log("My list of countries: " , data[0].countries[0].country);
	}); */

	// methods for dynamically creating campaign cells
	$scope.renderHtml = function (country) {
    	return $sce.trustAsHtml($scope.normalCell(country.countries[0].country));
    };
    
	$scope.normalCell = function(country)
	{
		console.log("render country: ",  country);
		return '<div><a href="#/country/'+country._id+'">'
		+country._id+
		'</a></div><div>'+country+'</div>';
	}	

}]);//End Country List Controller 


/*
	MspDetailsController
	• display msp details
	• delete msp
	• update msp
*/
countryControllers.controller('CountryDetailsController', ['$rootScope','$scope', 'countryFactory', '$routeParams', '$location', function($rootScope,$scope, countryFactory, $routeParams, $location ) {

	$scope.sectionName = "Country";
	$scope.saveButtonLabel = "UPDATE";
	$scope.hasSaveButton = false;
	$scope.hasDeleteButton = false;

	// delete country method
	$scope.deleteItem = function(){
		countryFactory.delete($scope.country.countryId).success(function(data) {
			console.log("deleted country ",data);
			$location.path("/country");
		});
	}
	
	// save country method
	$scope.saveItem = function(country)
	{   
		countryFactory.update($scope.country.countryId, country).success(function(data) {
			console.log("updating country ",data);
			$location.path("/country");
		}); 
	}
	// get country details
	+ 
	console.log("countryDetailsController.saveItem - get country: " + $routeParams.itemId ); 

	countryFactory.getCountry( $routeParams.itemId ).success(function(data) {

		console.log("country.flag: " + data.flag );
		$scope.country = data.country;
		$scope.flag  = data.flag;
		$scope.itemId =  $scope.countryId;

		// now that we have our country set it to root scope 
		
	}).error (function(data) {
		alert("GET COUNTRY - ERROR: "+  data );
	}); ; 
	
}]);

/*
	countryCreateController
	• populate new country
	• save new country
*/

countryControllers.controller('CountryCreateController', ['$scope', '$http','$location', function($scope, $http, $location) {
	
	
	console.log("CountryCreateController - creating new country");
	$scope.sectionName = "Country";
	$scope.saveButtonLabel = "SAVE";
	$scope.hasDeleteButton = false;
	// create empty country
	var countryObj = new Country();

	countryObj.countryId  = $scope.countries.length + 1;
	countryObj.name = $scope.country;

	// Have to come up with specs on creating a new country. Right now lets just stick with 5 to beta test
	// save method
	$scope.saveItem = function(){
		alert("FEATURE Coming Soon! ");
	/*	$http.post(endpoint()+'country/', countryObj).
		success(function(data) {
			console.log("MSCreateController.saveItem - created country details",data);
			$location.path("/country");
			
		});  */
	}
	
}]);


