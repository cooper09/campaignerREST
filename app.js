var mainApp = angular.module('mainApp', [
  'ngRoute',
  'ngCookies',
  'testController',
  'dateController',
  'campaignControllers',
  'countryControllers',
  'imageControllers', 
  'legalControllers'
]);

mainApp.config(['$routeProvider', function($routeProvider) {
	
	$routeProvider.
		when('/campaign', {
			templateUrl: 'partials/campaigns/campaign-list.html',
			controller: 'CampaignListController'
		}).
		when('/country', {
			templateUrl: 'partials/countries/country-list.html',
			controller: 'CountryListController'
		}).
		when('/image', {
			templateUrl: 'partials/images/image-list.html',
			controller: 'ImageListController'
		}).
		when('/legal', {
			templateUrl: 'partials/legal/legal-list.html',
			controller: 'LegalListController'
		}).
		when('/campaign/:itemId', {
		//	templateUrl: 'partials/campaign-details.html',
		//	controller: 'CampaignDetailsController'
		}).
		when('/country/:itemId', {
		//	templateUrl: 'partials/msp-details.html',
		//	controller: 'MspDetailsController'
		}).
		when('/image/:itemId', {
		//	templateUrl: 'partials/image-details.html',
		//	controller: 'ImageDetailsController'
		}).
		when('/legal/:itemId', {
		//	templateUrl: 'partials/legal-details.html',
		//	controller: 'LegalDetailsController'
		}).
		
		when('/new/campaign', {
		//	templateUrl: 'partials/campaign-create.html',
		//	controller: 'CampaignCreateController'
		}).
		when('/new/country', {
		//	templateUrl: 'partials/msp-create.html',
		//	controller: 'MspCreateController'
		}).
		when('/new/image', {
		//	templateUrl: 'partials/image-create.html',
		//	controller: 'ImageCreateController'
		}).
		when('/new/legal', {
		//	templateUrl: 'partials/legal-create.html',
		//	controller: 'LegalCreateController'
		}).
		otherwise({
			redirectTo: '/'
		});
	}]);


var testController = angular.module('testController', []);
var dateController = angular.module('dateController', []);
var dataController = angular.module('dataController', []);

mainApp.controller('testController', ['$scope', '$rootScope', '$filter', 'testFactory', function($scope, $rootScope, $filter, testFactory ) {

	$scope.init = function() {
		console.log("Test Controller in Control!!!");
		$scope.datevalue = new Date(2014, 9, 22);

	//	console.log("currentDate: " + currentDate );
	}

	$scope.clickMe = function() {
		console.log("I've been clicked...");
	}
// test out broadcasting - see how this works...

	$scope.startScanner = function() {
		console.log("start broadcast...");
		var test = "test me!";
		$rootScope.$broadcast('scanner-started', { any: test });
	}

	$scope.$on('scanner-started', function(event, args) {
		 var anyThing = args.any;
		// do what you want to do
		console.log("broadcast caught: " + args.any );

	});

	$scope.CreateDictionary = function () {
		var days = new Array();
		days['Sunday'] = 1;
		days['Monday'] = 2;
		days['Tuesday'] = 3;
		days['Wednesday'] = 4;
		days['Thursday'] = 5;
		days['Friday'] = 6;
		days['Saturday'] = 7;
		
		return days;
	}//end CreateDictionary

}]);//end test controller 

mainApp.controller('dateController', ['$scope', function($scope) {
       $scope.value = new Date(2014, 9, 22);
       console.log("set default date: " + $scope.datevalue );

        $scope.$watch('defaultvalue', function () { 
        	$scope.value = new Date(2014, 9, 22);
        	console.log('Date string change: '+ $scope.datevalue );

    	});  

     }]);//end date controller 

mainApp.controller('dataController', ['$scope','$http', function($scope, $http ) {
    console.log("lets get some data:  ");

    $scope.items = Array();

    	$http.get('http://default-environment-nm5p9qwapp.elasticbeanstalk.com/').success(function(data) {
			console.log("getData data:  ",data);
			$scope.items = data;
			console.log("an item: " + $scope.items );
			$scope.itemid = data[0]._id;
			$scope.item = data[0].item;
		});

     }]);//end date controller 
