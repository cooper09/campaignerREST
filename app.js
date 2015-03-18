var mainApp = angular.module('mainApp', [
  'ngRoute',
  'ngCookies',
  'testController',
  'dateController',
  'campaignControllers',
  'countryControllers',
  'imageControllers', 
  'legalControllers',
  'videoControllers',
  'selectControllers'
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
		when('/video', {
			templateUrl: 'partials/videos/video-list.html',
			controller: 'VideoListController'
		}).
		when('/legal', {
			templateUrl: 'partials/legal/legal-list.html',
			controller: 'LegalListController'
		}).
		when('/campaign/:itemId', {
			templateUrl: 'partials/campaigns/campaign-details.html',
			controller: 'CampaignDetailsController'
		}).
		when('/country/:itemId', {
			templateUrl: 'partials/countries/country-details.html',
			controller: 'CountryDetailsController'
		}).
		when('/image/:itemId', {
			templateUrl: 'partials/images/image-details.html',
			controller: 'ImageDetailsController'
		}).
		when('/video/:itemId', {
			templateUrl: 'partials/videos/video-details.html',
			controller: 'VideoDetailsController'
		}).
		when('/legal/:itemId', {
			templateUrl: 'partials/legal/legal-details.html',
			controller: 'LegalDetailsController'
		}).
		
		when('/new/campaign', {
			templateUrl: 'partials/campaigns/campaign-create.html',
			controller: 'CampaignCreateController'
		}).
		when('/new/country', {
			templateUrl: 'partials/countries/country-create.html',
			controller: 'CountryCreateController'
		}).
		when('/new/image', {
			templateUrl: 'partials/images/image-create.html',
			controller: 'ImageCreateController'
		}).
		when('/new/image', {
			templateUrl: 'partials/images/image-create.html',
			controller: 'ImageCreateController'
		}).
		when('/new/video', {
			templateUrl: 'partials/videos/video-create.html',
			controller: 'VideoCreateController'
		}).
		otherwise({
			redirectTo: '/'
		});
	}]);


var testController = angular.module('testController', []);
var dateController = angular.module('dateController', []);
var dataController = angular.module('dataController', []);

mainApp.controller('testController', ['$scope', '$rootScope', '$filter', 'campaignFactory','countryFactory','imageFactory','legalFactory', function($scope, $rootScope, $filter, campaignFactory, countryFactory, imageFactory, legalFactory ) {

	var campArr = [];

	$scope.init = function() {
		console.log("Test Controller in Control!!!");
		//get all scope data for campaingns, countries, images and legal docs


	campaignFactory.get().success(function(data) {
		console.log("campfactory list data: " , data);
		$scope.campaigns = data;
		$rootScope.campaigns = $scope.campaigns;
		campArr = $scope.campaigns;
		$scope.currentCampaignId = campArr.length;
		console.log("App.js - current campaign id: ", campArr );
	}); 

	countryFactory.get().success(function(data) {
		console.log("My list of countries: " , data);
		$scope.countries = data;
		$rootScope.countries = $scope.countries;

	}); 

	imageFactory.get().success(function(data) {
		console.log(" current LIST of images: ", data );
		$scope.images = data;
		$rootScope.images = $scope.images;
	});

	//GET add'l data here....
	campaignFactory.getVideos().success(function(data) {
		console.log("videos",data)
		$scope.videos = data;
		$rootScope.videos = $scope.videos;
		$rootScope.$broadcast('videos-loaded');
	});

	legalFactory.get().success(function(data) {
		console.log(" current LIST of legal docs: ", data );
		$scope.legals = data;
		$rootScope.legals = $scope.legals;
	});

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
		console.log('event: ', event );
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
    console.log("lets get some data:  " + endpoint());

    $scope.items = Array();

    	//$http.get('http://default-environment-nm5p9qwapp.elasticbeanstalk.com/').success(function(data) {
    	$http.get(endpoint()).success(function(data) {	
			console.log("mainApp - getData data:  ",data);
			$scope.campaigns = data;
			console.log("our campaigns: " + $scope.campaigns );
		});

     }]);//end date controller 
