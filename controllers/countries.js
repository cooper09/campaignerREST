
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
	
	countryFactory.get().success(function(data) {
		console.log("My list of countries: " , data[0].countries );
		$scope.countries = data[0].countries;
		//console.log("My list of countries: " , data[0].countries[0].country);
	}); 

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
countryControllers.controller('CountryDetailsController', ['$rootScope','$scope', 'countryFactory', '$routeParams', '$location','dataFactory', function($rootScope,$scope, mspFactory, $routeParams, $location, dataFactory) {

	$scope.sectionName = "Country";
	$scope.saveButtonLabel = "UPDATE";
	$scope.hasDeleteButton = true;
	
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
	
	console.log("countryDetailsController.saveItem - get country: " + $routeParams.itemId ); 
	countryFactory.getcountry( $routeParams.itemId ).success(function(data) {
		$scope.country = data.country.data;
		$scope.itemId =  $scope.country.countryId;

		// now that we have our country set it to root scope 
		dataFactory.setcountry($scope.country);
		console.log("country.saveItem: " , $rootScope.country );
	}); 
	
	countryFactory.getImages( $routeParams.itemId ).success(function(data) {
		console.log("countryDetailsController.saveItem - images",data.images)
		$scope.images = data.images;
		
	});
	
	// get countrys
	countryFactory.getLegal( $routeParams.itemId ).success(function(data) {
		console.log("countryDetailsController.saveItem - legal: ",data.legals.data)
		$scope.legalData = data.legals.data;
	}); 
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
	$scope.country = new Country();
	
	// save method
	$scope.saveItem = function(){
		console.log("MSCreateController.saveItem - creating: ", $scope.city);
		$http.post(endpoint()+'country/', $scope.country).
		success(function(data) {
			console.log("MSCreateController.saveItem - created country details",data);
			$location.path("/country");
			
		});
	}
	
}]);


