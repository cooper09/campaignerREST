/*
	Video Controllers
	
	• VideoListController: 
	• VideoDetailsController
*/
var videoControllers = angular.module('videoControllers', []);

var newImgId = "";
/*
	Video Model
*/
var Video = function()
{
	    this.data = {
		videoId: null,
		label: "unlabeled Video",
		location: "www"
	};
}

/*
	VideoListController
	• display list Video items
	• create new Video
*/
videoControllers.controller('VideoListController', ['$scope', 'VideoFactory', function($scope, VideoFactory) {
	
	$scope.sectionName = "Video";
	$scope.createNewLink = "#/new/Video";

	$scope.newVideo = function()
	{
		alert("coming soon");
	}
}]);

/*
	VideoDetailsController
	• display Video details
	• delete Video
	• update Video
*/

videoControllers.controller('VideoDetailsController', ['$rootScope','$scope','$http','VideoFactory', '$routeParams', '$location', function($rootScope, $scope, $http, VideoFactory, $routeParams, $location) {	
//VideoControllers.controller('VideoDetailsController', ['$scope', '$http','$routeParams','$location', function($scope, $http, $routeParams, $location) {
	$scope.sectionName = "Video";
	$scope.saveButtonLabel = "UPDATE";
	$scope.hasDeleteButton = true;

	// TO BE IMPLEMENTED
	// delete Video method
	$scope.deleteItem = function(Video){
		console.log("deleteItem: " + Video.data.label );
		VideoFactory.deleteItem(Video.data.VideoId).success(function(data) {
			console.log("deleted Video ",data);
			$location.path("/Video");
		});
	}
	
	
	// save Video method
	$scope.saveItem = function(Video)
	{   
		console.log("VideoDetailsController - update item: " , Video.data.VideoId );

		var thisId = Video.data.VideoId;
		VideoFactory.update(thisId, Video ).success(function(data) {
			console.log("VideoDetailsController - updated Video ", data);
			$location.path("/Video");
		}); 
	}
	
	VideoFactory.getVideo($routeParams.itemId).success(function(data) {
		console.log("VideoDetailsController - loaded Video details: ", data );
		$scope.Video = data;
		//$scope.itemId = $scope.Video.data.VideoId;
		console.log("Got scope Video: " + $scope.Video );
	});
	

}]);

/*
	VideoCreateController
*/
videoControllers.controller('VideoCreateController', ['$scope', '$http','$location', function($scope, $http, $location) {
	$scope.sectionName = "Video";
	$scope.saveButtonLabel = "SAVE";
	$scope.hasDeleteButton = false;
	
	$scope.Video = new Video();
	
	console.log("VideoCreateController - new Video: ", $scope.Video.data );
	// save method
	$scope.saveItem = function(){
		console.log("TEST - VideoController - creating Video - label: ", $scope.Video.data.label );
		//console.log("VideoController - creating Video - data label: ", $scope.Video.data.label);

		$http.post(endpoint()+'Video/', $scope.Video.data).
		/*$http.post(endpoint()+'new_Video.php?Video=test.jpg'). */
		success(function(data) {
			console.log("VideoController - created Video details",data);
			$location.path("/Video");
			
		});
	}
	
}]);


