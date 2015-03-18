/*
	Video Controllers
	
	• VideoListController: 
	• VideoDetailsController
*/
var videoControllers = angular.module('videoControllers', []);

var currentId = "";
/*
	Video Model
*/
var Video = function()
{
	    this.data = {
		videoId: null,
		label: "unlabeled Video",
		location: "www",
		image: "genric image",
		views: "0"
	};
}

/*
	VideoListController
	• display list Video items
	• create new Video
*/
videoControllers.controller('VideoListController', ['$scope', 'videoFactory','$sce', function($scope, videoFactory, $sce ) {
	
	$scope.sectionName = "video";
	$scope.createNewLink = "#/new/video";

	$scope.newVideo = function()
	{
		alert("coming soon");
	}

	console.log("Current list of videos: " + $scope.videos );

	// methods for dynamically creating campaign cells
	$scope.renderHtml = function (video) {
	//	return campaign.item;
	//	return campaign ? $sce.trustAsHtml($scope.specialCell(campaign)) : $sce.trustAsHtml($scope.normalCell(campaign));
    	return $sce.trustAsHtml($scope.normalCell(video));
    };

    $scope.normalCell = function(video)
	{
		return '<div><a href="#/video/'+video.videoId+'">'
		+video.label+'</a><br/>'
		+'</div><video id="viddy" width="320" height="240" autoplay><source id="source" src='+video.location+' type="video/mp4"</video><br/>';
	}	

	currentId = $scope.videos.length;

}]);//end VideoListController

/*
	VideoDetailsController
	• display Video details
	• delete Video
	• update Video
*/

videoControllers.controller('VideoDetailsController', ['$rootScope','$scope','$http','videoFactory', '$routeParams', '$location', function($rootScope, $scope, $http, videoFactory, $routeParams, $location) {	
	$scope.sectionName = "video";
	$scope.saveButtonLabel = "UPDATE";
	$scope.hasDeleteButton = true;

	// TO BE IMPLEMENTED
	// delete Video method
	$scope.deleteItem = function(video){
		console.log("deleteItem: " + video.data.label );
		videoFactory.deleteItem(video.data.videoId).success(function(data) {
			console.log("deleted Video ",data);
			$location.path("/video");
		});
	}
	
	
	// save Video method
	$scope.saveItem = function(video)
	{   
		console.log("VideoDetailsController - update item: " , video.data.videoId );

		var thisId = video.data.videoId;
		videoFactory.update(thisId, video ).success(function(data) {
			console.log("VideoDetailsController - updated Video ", data);
			$location.path("/video");
		}); 
	}
	
	videoFactory.getVideo($routeParams.itemId).success(function(data) {
		console.log("VideoDetailsController - loaded Video details: ", data );
		$scope.video = data;
		console.log("Got scope Video: " + $scope.video );
	});

}]);//end VideoDetailsController

/*
	VideoCreateController
*/
videoControllers.controller('VideoCreateController', ['$scope', '$http','$location', function($scope, $http, $location) {
	$scope.sectionName = "video";
	$scope.saveButtonLabel = "SAVE";
	$scope.hasDeleteButton = false;
	
	$scope.video = new Video();
	
	console.log("VideoCreateController - new Video: ", $scope.video.data );
	// save method
	$scope.saveItem = function(){
		console.log("TEST - VideoController - creating Video - id: ", $scope.video.currentId );
		console.log("TEST - VideoController - creating Video - label: ", $scope.video.label );
		console.log("TEST - VideoController - creating Video - location: ", $scope.video.location );

		var videoObj = { 
							videoId: currentId,		//$scope.campaigns.length,
  							label: $scope.campaign.label, 
  							location: "https://s3-us-west-2.amazonaws.com/polyvideo/"+ "test.jpg", 
  							clicks: "0"
  							}

		//console.log("VideoController - creating Video - data label: ", $scope.Video.data.label);

	/*	$http.post(endpoint()+'Video/', $scope.video.data).
		success(function(data) {
			console.log("VideoController - created Video details",data);
			$location.path("/video");
			
		}); */
	}
	
}]);//end VideoCreateController


