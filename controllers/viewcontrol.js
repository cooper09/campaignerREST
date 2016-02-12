var viewControllers = angular.module('viewControllers', []);

viewControllers.controller('viewController', ['$scope', '$route','$rootScope','$http', 'campaignFactory', 'countryFactory','imageFactory','legalFactory',
  function($scope, $route, $rootScope, $http, campaignFactory, countryFactory, imageFactory, legalFactory ) {

    $scope.onViewLoad = function($data){
      console.log("onViewLoad - loading all campaigns");
      var campaignList;

      //console.log('view changed: ' + $route.current.templateUrl + ' is loaded !!'); 

      campaignFactory.get().success(function(data) {
          console.log("Got campaign data: " , data);
          $scope.campaigns = data;
          $rootScope.campaigns = $scope.campaigns;
          campArr = $scope.campaigns;
          $scope.currentCampaignId = campArr.length;
        }); 

       countryFactory.get().success(function(data) {
          console.log("Got country data: " , data);
          $scope.countries = data;
          $rootScope.countries = $scope.countries;

        }); 

      imageFactory.get().success(function(data) {
          console.log("Got image data: ", data );
          $scope.images = data;
          $rootScope.images = $scope.images;
        });

        //GET add'l data here....
        campaignFactory.getVideos().success(function(data) {
          console.log("Got video data:",data)
          $scope.videos = data;
          $rootScope.videos = $scope.videos;
          $rootScope.$broadcast('videos-loaded');
        });

        legalFactory.get().success(function(data) {
          console.log("Got legal data: ", data );
          $scope.legals = data;
          $rootScope.legals = $scope.legals;
        });

/*
     $scope.campaignData = dataFactory.getCampaignData();

      console.log("viewcontroller - scope campaign data: ", $scope.campaignData); 

// when campaigns are listed load msps
      if ($route.current.templateUrl == 'partials/campaign-list.html')  {
        console.log("campaignlisting page...");
        $scope.msps = dataFactory.getMspData();
        console.log("ViewController - current msps: ", $scope.msps );
        $rootScope.$broadcast('msps-loaded');
      }

// when campaign detais  are loaded get specific campaign data
      if ($route.current.templateUrl == 'partials/campaign-details.html')  {
      	console.log("campaign details page...");

      $scope.campaign = dataFactory.getCampaign();

      	console.log("ViewController - current campaign: ", $scope.campaign );
      }  */

    };//end onViewLoad



}]);// End view Controller 
	