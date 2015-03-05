/*
	Image Controllers
	
	• ImageListController: 
	• ImageDetailsController
*/
var imageControllers = angular.module('imageControllers', []);

var newImgId = "";
/*
	Image Model
*/
var Image = function()
{
	    this.data = {
		imageId: null,
		image: "unlabeled image",
		location: "www"
	};
}

/*
	ImageListController
	• display list image items
	• create new image
*/
imageControllers.controller('ImageListController', ['$scope', 'imageFactory', function($scope, imageFactory) {
	
	$scope.sectionName = "Image";
	$scope.createNewLink = "#/new/image";

	$scope.newImage = function()
	{
		alert("coming soon");
	}
	
	imageFactory.get().success(function(data) {
		console.log(" current LIST of images: ", data );
		$scope.images = data;
		
	});
}]);

/*
	ImageDetailsController
	• display image details
	• delete image
	• update image
*/

imageControllers.controller('ImageDetailsController', ['$rootScope','$scope','$http','imageFactory', '$routeParams', '$location', function($rootScope, $scope, $http, imageFactory, $routeParams, $location) {	
//imageControllers.controller('ImageDetailsController', ['$scope', '$http','$routeParams','$location', function($scope, $http, $routeParams, $location) {
	$scope.sectionName = "Image";
	$scope.saveButtonLabel = "UPDATE";
	$scope.hasDeleteButton = true;

	// TO BE IMPLEMENTED
	// delete image method
	$scope.deleteItem = function(image){
		console.log("deleteItem: " + image.data.label );
		imageFactory.deleteItem(image.data.imageId).success(function(data) {
			console.log("deleted image ",data);
			$location.path("/image");
		});
	}
	
	
	// save image method
	$scope.saveItem = function(image)
	{   
		console.log("imageDetailsController - update item: " , image.data.imageId );

		var thisId = image.data.imageId;
		imageFactory.update(thisId, image ).success(function(data) {
			console.log("imageDetailsController - updated image ", data);
			$location.path("/image");
		}); 
	}
	
	imageFactory.getImage($routeParams.itemId).success(function(data) {
		console.log("ImageDetailsController - loaded image details: ", data );
		$scope.image = data;
		//$scope.itemId = $scope.image.data.imageId;
		console.log("Got scope image: " + $scope.image );
	});
	

}]);

/*
	ImageCreateController
*/
imageControllers.controller('ImageCreateController', ['$scope', '$http','$location', function($scope, $http, $location) {
	$scope.sectionName = "Image";
	$scope.saveButtonLabel = "SAVE";
	$scope.hasDeleteButton = false;
	
	$scope.image = new Image();
	
	console.log("imageCreateController - new image: ", $scope.image.data );
	// save method
	$scope.saveItem = function(){
		console.log("ImageController - creating image - label: ", $scope.image.data.label );
		//console.log("ImageController - creating image - data label: ", $scope.image.data.label);

		//$http.post(endpoint()+'image/', $scope.image.data).
		$http.post(endpoint()+'new_image.php?image=test.jpg').
		success(function(data) {
			console.log("ImageController - created image details",data);
			$location.path("/image");
			
		});
	}
	
}]);


