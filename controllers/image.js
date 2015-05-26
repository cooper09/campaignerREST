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
		label: "unlabeled image",
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
}]);

/*
	ImageDetailsController
	• display image details
	• delete image
	• update image
*/

imageControllers.controller('ImageDetailsController', ['$rootScope','$scope','$http','imageFactory', '$routeParams', '$location', function($rootScope, $scope, $http, imageFactory, $routeParams, $location) {	
	$scope.sectionName = "Image";
	$scope.saveButtonLabel = "UPDATE";
	$scope.hasDeleteButton = true;

	// TO BE IMPLEMENTED
	// delete image method
	$scope.deleteItem = function(image){
		console.log("deleteItem: " + image.imageId + " image: " , image.label );
		imageFactory.deleteItem(image.imageId).success(function(data) {
			console.log("deleted image ",data);
			$location.path("/image");
		});
	}
	
	//Note any changes to the form

	
	// save image method
	$scope.saveItem = function(image)
	{   
		console.log("imageDetailsController - update item: " , image.imageId );
		console.log("imageDetailsController - label: " , image.label );
		console.log("imageDetailsController - location: " , image.location );
	/*	var thisId = image.imageId;
		imageFactory.update(thisId, image ).success(function(data) {
			console.log("imageDetailsController - updated image ", data);
			$location.path("/image");
		});  */
		
		var imgId = image.imageId;

		imageFactory.update(image).success(function(data) {
			console.log("ImageDetailsController - updated image",data);
			$location.path("/image");
		});
	}//ehd save image
	
imageFactory.getImage($routeParams.itemId).success(function(data) {
		console.log("ImageDetailsController - loaded image details: ", data );
		$scope.image = data;
		//$scope.itemId = $scope.image.data.imageId;
		console.log("Got scope image: " + $scope.image );
	});
	

}]);

/*
	ImageCreateController - Creating an image consists of uploading the chosen image and to its AWS bucket then creating a document in mongo database
*/
imageControllers.controller('ImageCreateController', ['$scope', '$http','$location', function($scope, $http, $location) {
	$scope.sectionName = "Image";
	//$scope.saveButtonLabel = "SAVE";
	//$scope.hasDeleteButton = false;
	$scope.hasSaveButton = false;
	
	$scope.image = new Image();
	
	// save method
	$scope.saveItem = function(){
		console.log("TEST - ImageController - creating image - label: ", $scope.image.data.label );
		//console.log("ImageController - creating image - data label: ", $scope.image.data.label);

/*		$http.post(endpoint()+'image/', $scope.image.data).

		success(function(data) {
			console.log("ImageController - created image details",data);
			$location.path("/image");
			
		}); */
	}

	//AWS image upload
	//Angular upload Function  
$scope.uploadFile = function(files,type) {
   console.log("Image upload file type: ", files );

    var file =  files[0];
    var filename = files[0].name;

    alert("current number of images: " + $scope.images.length );
    var imageId = $scope.images.length + 1;
    var label = document.getElementById('imagelabel').value;
    console.log("file label: " + label );
    var location = "https://s3-us-west-2.amazonaws.com/polyimages/"+ filename;

    AWS.config.update({
        accessKeyId: "AKIAJ7C7LFEZRSDM7BMA",
        secretAccessKey: "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"
    });

    var bucket = new AWS.S3({params: {Bucket: 'polyimages'}});

    var results = document.getElementById('results');

  
      if (file) {
      var params = {Key: file.name, ContentType: file.type, Body: file};
        bucket.upload(params, function (err, data) {
          console.log(err);
          results.innerHTML = err ? 'ERROR!' : 'UPLOADED.';
      
        });  

       var imageObj = { 
                    'imageId' : imageId, 
                    'label':  label,
                    'location': location
                  }

        $http.post(endpoint()+'image/', imageObj).success(function(data) {
			console.log("ImageController - created image details",data);
			$location.path("/image");
			
		})
      } else {
        results.innerHTML = 'Nothing to upload.';
	  }
   }//end uploadFile
	
}]);//end ImageCreateController


